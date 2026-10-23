# Cyber Tech Squad — site officiel

Site du club de cybersécurité de l’Université Alioune Diop de Bambey (UADB).
Cette application Next.js présente le club, son bureau, ses articles de veille,
ses événements et sa boutique. Elle permet aussi de soumettre une demande
d’adhésion.

## Stack

- Next.js 15 avec App Router et TypeScript
- Tailwind CSS 4 et styles globaux dans `src/app/globals.css`
- Decap CMS avec contenu versionné dans le dépôt Git
- Supabase PostgreSQL pour les demandes d’adhésion
- Cloudflare Turnstile contre le spam
- Resend pour les emails de confirmation (facultatif)
- Déploiement prévu sur Vercel

## Démarrage local

Prérequis : Node.js 20.9 ou supérieur.

```bash
npm install
```

Copiez `.env.example` vers `.env.local`, puis renseignez les valeurs nécessaires.
Lancez ensuite le serveur de développement :

```bash
npm run dev
```

Le site est disponible sur <http://localhost:3000>. Les pages publiques et les
fichiers éditoriaux peuvent être consultés sans identifiants externes. Le
formulaire d’adhésion nécessite des clés Turnstile et Supabase valides.

## Organisation du code

```text
src/
  app/                 Pages App Router, styles, layout et API
    api/members/       Endpoint POST d’adhésion
    adhesion/          Page et formulaire d’adhésion
    blog/              Liste des articles et page par slug
    events/            Liste des événements
    shop/              Boutique
  components/          Composants d’interface partagés
  lib/                 Accès au contenu, schémas, types et utilitaires
    server/             Services serveur (Supabase, Turnstile, Resend)
content/
  blog/                 Articles Markdown avec frontmatter
  events/               Événements Markdown avec frontmatter
  team/                 Membres du bureau en YAML
  shop/                 Produits en YAML
public/
  admin/                Interface et configuration Decap CMS
  images/               Images publiques du site et des contenus
supabase/
  migrations/           Migrations SQL versionnées
```

Les pages `src/app` appellent les fonctions serveur de `src/lib/content.ts`.
Celles-ci lisent les fichiers sous `content/`, analysent le Markdown ou YAML,
puis valident chaque document avec Zod. Les composants `TeamGrid` et `ShopGrid`
reçoivent les données déjà validées. Pour ajouter du contenu, créez un fichier
avec les mêmes champs que les exemples existants ou utilisez `/admin` une fois
Decap configuré.

## Pages et endpoints

- `/` : présentation du club et du bureau
- `/blog` et `/blog/[slug]` : veille et articles
- `/events` : ateliers, CTF et événements
- `/shop` : produits et liens de commande
- `/adhesion` : formulaire d’adhésion
- `/admin` : interface Decap CMS
- `POST /api/members` : validation, contrôle Turnstile, insertion Supabase et
  email de confirmation facultatif

## Variables d’environnement

| Variable | Usage | Obligatoire pour l’adhésion |
| --- | --- | --- |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Clé publique du widget anti-spam | Oui |
| `TURNSTILE_SECRET_KEY` | Vérification serveur Turnstile | Oui |
| `SUPABASE_URL` | URL du projet Supabase | Oui |
| `SUPABASE_SERVICE_ROLE_KEY` | Accès serveur à la base | Oui |
| `RESEND_API_KEY` | Envoi de confirmations | Non |
| `RESEND_FROM_EMAIL` | Expéditeur vérifié Resend | Non |
| `NEXT_PUBLIC_SITE_URL` | URL publique prévue pour le site | Actuellement non utilisée dans le code |

Les valeurs locales sont à mettre dans `.env.local`, ignoré par Git. Ne
committez jamais de clé privée, en particulier `SUPABASE_SERVICE_ROLE_KEY`.
Resend est facultatif : si ses deux variables sont absentes, l’adhésion reste
enregistrée sans email de confirmation.

## Configuration des services

### Supabase

Créez un projet, puis appliquez `supabase/migrations/0001_members.sql` dans
l’éditeur SQL Supabase ou avec Supabase CLI. La table `members` possède des
contraintes d’unicité sur l’email et le numéro étudiant et active RLS sans
politique publique. L’API utilise la clé `service_role` côté serveur seulement.

### Turnstile et Resend

Créez un site Turnstile pour les domaines utilisés en local et en production,
puis ajoutez sa clé publique et sa clé secrète aux environnements correspondants.
Pour les emails, vérifiez le domaine d’envoi dans Resend et configurez
`RESEND_API_KEY` et `RESEND_FROM_EMAIL`.

### Decap CMS

La configuration se trouve dans `public/admin/config.yml`. Avant d’activer le
CMS, remplacez `VOTRE-ORGANISATION/VOTRE-DEPOT` par le dépôt GitHub réel, ajustez
`backend.branch` à la branche de publication choisie et configurez un flux OAuth
GitHub compatible ou Git Gateway. Decap ne peut pas authentifier les éditeurs
avec le seul fichier de configuration. Les médias envoyés par le CMS sont
stockés dans `public/images/uploads`.

## Sécurité et en-têtes

`src/app/api/members/route.ts` limite la taille du corps, vérifie l’origine,
valide les entrées avec Zod et traite les réponses invalides. Le service serveur
valide Turnstile avant d’insérer les données dans Supabase. Les en-têtes CSP,
HSTS, X-Frame-Options et autres en-têtes de sécurité sont définis dans
`next.config.ts`. La CSP autorise `'unsafe-eval'` uniquement en développement,
pour le rafraîchissement de Next.js ; toute nouvelle intégration tierce doit
être ajoutée explicitement aux directives concernées.

## Commandes de qualité et livraison

```bash
npm run format       # Formate le code pris en charge
npm run format:check # Vérifie le formatage
npm run typecheck    # Vérifie les types TypeScript
npm run check        # Formatage + vérification des types
npm run build        # Construit l’application de production
```

Le déploiement continu Vercel et ses variables d’environnement doivent être
configurés sur le dépôt et le projet Vercel réels. Les offres gratuites et leurs
quotas peuvent évoluer ; un coût mensuel nul dépend des offres des fournisseurs.

## État du projet

Le dépôt contient le socle du site, les pages principales, le thème clair/sombre,
la navigation responsive, des exemples de contenu, l’interface Decap, l’API
d’adhésion et la migration SQL initiale. Le projet est actuellement sur la
branche `dev`.

Avant une mise en production, il reste à :

1. Vérifier le projet avec `npm run check` et `npm run build` dans
   l’environnement local.
2. Renseigner et vérifier les variables d’environnement de développement,
   prévisualisation et production.
3. Appliquer la migration SQL au projet Supabase réel.
4. Remplacer le dépôt et la branche fictifs dans Decap, puis configurer et tester
   son authentification GitHub.
5. Relier Vercel au dépôt, choisir la branche de production et vérifier les
   en-têtes, le formulaire, les emails et le parcours éditorial sur les domaines
   finaux.

Les intégrations externes ne sont pas considérées comme opérationnelles tant que
leurs comptes, clés et domaines ne sont pas configurés et validés.
