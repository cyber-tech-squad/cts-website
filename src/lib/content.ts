import "server-only";

import type { Dirent } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import { parse as parseYaml } from "yaml";

const CONTENT_ROOT = path.join(process.cwd(), "content");
const FRONTMATTER_PATTERN = /^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?([\s\S]*)$/;
const INTERNAL_PATH_PATTERN = /^\/(?!\/)[^\s\\]*$/;

const nonEmptyText = z.string().trim().min(1);
const optionalText = nonEmptyText.optional();
const optionalImage = z.string().trim().optional().or(z.literal(""));
const optionalHttpUrl = z
  .string()
  .trim()
  .refine(isHttpUrl, { message: "Le lien doit commencer par http:// ou https://." })
  .optional()
  .or(z.literal(""));
const displayOrder = z.number().int().min(0).optional();
const contentDate = z.iso.datetime({ offset: true });

const teamMemberSchema = z.object({
  firstName: nonEmptyText,
  lastName: nonEmptyText,
  role: nonEmptyText,
  description: nonEmptyText,
  photo: optionalImage,
  order: displayOrder,
  slug: nonEmptyText,
  level: z.enum(["coordinateur", "responsable", "adjoint"]).optional(),
  pole: z.enum(["finances", "relations-exterieures", "organisation", "communication", "pedagogie"]).optional(),
  niveau: optionalText,
  filiere: optionalText,
  memberSince: z.union([z.number().int().min(2000), nonEmptyText]).optional(),
  skills: z.array(nonEmptyText).optional(),
  linkedin: optionalHttpUrl,
  github: optionalHttpUrl,
});

const productSchema = z.object({
  name: nonEmptyText,
  price: z.number().int().min(0),
  description: nonEmptyText,
  image: optionalImage,
  category: z.enum(["Autocollants", "Vêtements", "Accessoires"]).optional(),
  badge: z.enum(["Nouveau", "Disponible", "Bientôt", "Épuisé"]).optional(),
  actionLabel: nonEmptyText,
  actionUrl: z.string().trim().refine(isAllowedActionUrl, {
    message:
      "Le lien de commande doit être un chemin du site (ex. /contact) ou utiliser HTTP, HTTPS ou mailto.",
  }),
  order: displayOrder,
  slug: nonEmptyText,
});

const articleSchema = z.object({
  title: nonEmptyText,
  date: contentDate,
  excerpt: nonEmptyText,
  category: nonEmptyText,
  cover: optionalImage,
  body: z.string(),
  slug: nonEmptyText,
});

const eventSchema = z.object({
  title: nonEmptyText,
  date: contentDate,
  location: nonEmptyText,
  kind: z.enum(["Atelier", "CTF", "Conférence", "Rencontre"]),
  excerpt: nonEmptyText,
  cover: optionalImage,
  body: z.string(),
  slug: nonEmptyText,
});

export type TeamMember = z.infer<typeof teamMemberSchema>;
export type Product = z.infer<typeof productSchema>;
export type Article = z.infer<typeof articleSchema>;
export type ClubEvent = z.infer<typeof eventSchema>;

type ContentCollection = "blog" | "events" | "shop" | "team";
type ContentSchema<T> = z.ZodType<T>;

function isAllowedActionUrl(value: string): boolean {
  if (INTERNAL_PATH_PATTERN.test(value)) return true;

  try {
    return ["http:", "https:", "mailto:"].includes(new URL(value).protocol);
  } catch {
    return false;
  }
}

function isHttpUrl(value: string): boolean {
  try {
    return ["http:", "https:"].includes(new URL(value).protocol);
  } catch {
    return false;
  }
}

function parseMarkdown(source: string, filePath: string): Record<string, unknown> {
  const match = source.match(FRONTMATTER_PATTERN);
  if (!match) {
    throw new Error(`Le frontmatter YAML est absent ou mal formé dans ${filePath}.`);
  }

  return { ...parseYamlObject(match[1], filePath), body: match[2] };
}

function parseYamlDocument(source: string, filePath: string): Record<string, unknown> {
  return parseYamlObject(source, filePath);
}

function parseYamlObject(source: string, filePath: string): Record<string, unknown> {
  let document: unknown;
  try {
    document = parseYaml(source);
  } catch (error) {
    const reason = error instanceof Error ? error.message : "erreur YAML inconnue";
    throw new Error(`YAML invalide dans ${filePath}: ${reason}`);
  }

  if (!isRecord(document)) {
    throw new Error(`Le document YAML doit être un objet dans ${filePath}.`);
  }

  return document;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

async function readCollection<T>(
  collection: ContentCollection,
  extension: "md" | "yml",
  schema: ContentSchema<T>,
): Promise<T[]> {
  const directory = path.join(CONTENT_ROOT, collection);
  let files: Dirent[];

  try {
    files = await readdir(directory, { withFileTypes: true });
  } catch (error) {
    if (isMissingDirectory(error)) return [];
    throw error;
  }

  const contentFiles = files
    .filter((file) => file.isFile() && file.name.endsWith(`.${extension}`))
    .sort((left, right) => left.name.localeCompare(right.name));

  return Promise.all(
    contentFiles.map(async (file) => {
      const filePath = path.join(directory, file.name);
      const source = await readFile(filePath, "utf8");
      const content =
        extension === "md" ? parseMarkdown(source, filePath) : parseYamlDocument(source, filePath);
      const slug = file.name.slice(0, -(extension.length + 1));
      const result = schema.safeParse({ ...content, slug });

      if (!result.success) {
        throw new Error(`Contenu invalide dans ${filePath}: ${result.error.message}`);
      }

      return result.data;
    }),
  );
}

function isMissingDirectory(error: unknown): boolean {
  return error instanceof Error && "code" in error && error.code === "ENOENT";
}

export async function getTeam(): Promise<TeamMember[]> {
  const members = await readCollection("team", "yml", teamMemberSchema);
  return members.sort((left, right) => (left.order ?? 99) - (right.order ?? 99));
}

export async function getProducts(): Promise<Product[]> {
  const products = await readCollection("shop", "yml", productSchema);
  return products.sort((left, right) => (left.order ?? 99) - (right.order ?? 99));
}

export async function getArticles(): Promise<Article[]> {
  const articles = await readCollection("blog", "md", articleSchema);
  return articles.sort((left, right) => Date.parse(right.date) - Date.parse(left.date));
}

export async function getEvents(): Promise<ClubEvent[]> {
  const events = await readCollection("events", "md", eventSchema);
  return events.sort((left, right) => Date.parse(left.date) - Date.parse(right.date));
}