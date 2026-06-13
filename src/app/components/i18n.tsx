import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type Lang = "fr" | "en";

const translations = {
  // ── Navigation ──
  "nav.home": { fr: "Accueil", en: "Home" },
  "nav.services": { fr: "Services", en: "Services" },
  "nav.work": { fr: "Projets", en: "Work" },
  "nav.about": { fr: "\u00C0 propos", en: "About" },
  "nav.contact": { fr: "Contact", en: "Contact" },

  // ── Hero ──
  "hero.badge": { fr: "Directrice Artistique & Graphiste", en: "Art Director & Graphic Designer" },
  "hero.title1": { fr: "ZUL\u00C2L", en: "ZUL\u00C2L" },
  "hero.title2": { fr: "AYBEK.", en: "AYBEK." },
  "hero.desc": {
    fr: "Des identités et des expériences pensées pour durer, évoluer et être ressenties autant que comprises.",
    en: "Identities and experiences designed to last, evolve, and be felt as much as understood.",
  },
  "hero.cta1": { fr: "Parlons de votre idée", en: "Tell Us About Your Idea" },
  "hero.cta2": { fr: "Explorer les projets", en: "Explore the Work" },
  "hero.stat1": { fr: "Projets sortis", en: "Projects shipped" },
  "hero.stat2": { fr: "Années à créer", en: "Years creating" },
  "hero.stat3": { fr: "Terrains de jeu", en: "Creative playgrounds" },

  // ── Personal intro ──
  "personalIntro.badge": { fr: "\u00C0 propos", en: "About" },
  "personalIntro.title": {
    fr: "Une direction artistique entre précision, intuition et caractère.",
    en: "An art direction between precision, intuition, and character.",
  },
  "personalIntro.p1": {
    fr: "Entre stratégie digitale, direction artistique et design graphique, mon travail s’est construit autour d’une recherche d’équilibre : donner de la force à une idée sans l’écraser, créer une esthétique marquante sans perdre en clarté, et transformer une intention en univers visuel cohérent.",
    en: "Between digital strategy, art direction, and graphic design, my work has been shaped by a search for balance: giving strength to an idea without overpowering it, creating a distinctive aesthetic without losing clarity, and transforming an intention into a coherent visual world.",
  },
  "personalIntro.p2": {
    fr: "Diplômée d’un Master Expert en stratégie digitale, avec une spécialisation en direction artistique, je développe depuis plusieurs années des identités visuelles, supports éditoriaux et compositions graphiques pensés pour transmettre une présence, une atmosphère et un récit.",
    en: "With a Master Expert degree in digital strategy and a specialization in art direction, I have spent the past several years developing visual identities, editorial materials, and graphic compositions designed to convey a presence, an atmosphere, and a narrative.",
  },
  "personalIntro.signature": { fr: "Zulâl", en: "Zulâl" },

  // ── Services ──
  "services.badge": { fr: "Services", en: "Services" },
  "services.title1": { fr: "SAVOIR.", en: "KNOW." },
  "services.title2": { fr: "faire", en: "how" },
  "services.subtitle": {
    fr: "Des supports pensés ensemble, du premier angle à la dernière finition.",
    en: "Visual work shaped together, from the first angle to the final polish.",
  },
  "services.s1.title": { fr: "Design\nGraphique", en: "Graphic\nDesign" },
  "services.s1.desc": { fr: "Identités visuelles, logos, compositions et univers de marque.", en: "Visual identities, logos, layouts and brand worlds." },
  "services.s1.hover": { fr: "Des signes qui tiennent, même quand la marque change de format.", en: "Signs that hold up, even when the brand changes format." },
  "services.s2.title": { fr: "Direction\nArtistique", en: "Art\nDirection" },
  "services.s2.desc": { fr: "Concepts visuels, lignes créatives, cohérence et cadrage graphique.", en: "Visual concepts, creative lines, consistency and graphic framing." },
  "services.s2.hover": { fr: "Un angle clair, des règles utiles, assez d'air pour que l'image respire.", en: "A clear angle, useful rules, enough room for the image to breathe." },
  "services.s3.title": { fr: "Print &\n\u00C9dition", en: "Print &\nEditorial" },
  "services.s3.desc": { fr: "Affiches, brochures, magazines, flyers, CV et supports éditoriaux.", en: "Posters, brochures, magazines, flyers, resumes and editorial formats." },
  "services.s3.hover": { fr: "L'objectif : des objets imprimés qu'on a envie de garder, pas seulement de poser sur une pile.", en: "The goal: printed pieces people want to keep, not just drop onto a pile." },
  "services.s4.title": { fr: "Vid\u00E9o &\nMotion", en: "Video &\nMotion" },
  "services.s4.desc": { fr: "Montage, motion design, contenus animés et formats vidéo.", en: "Editing, motion design, animated content and video formats." },
  "services.s4.hover": { fr: "Le bon rythme, le bon cut, le mouvement qui sert l'idée.", en: "The right rhythm, the right cut, motion that serves the idea." },
  "services.s5.title": { fr: "Photographie", en: "Photography" },
  "services.s5.desc": { fr: "Prise de vue, sélection, retouche et direction photo.", en: "Shooting, image selection, retouching and photo direction." },
  "services.s5.hover": { fr: "Cadrer, choisir, retoucher juste assez. L'image fait le reste.", en: "Frame, choose, retouch just enough. The image does the rest." },
  "services.s6.title": { fr: "Brand\nContent", en: "Brand\nContent" },
  "services.s6.desc": { fr: "Contenus de marque, narration visuelle et formats de communication.", en: "Brand content, visual storytelling and communication formats." },
  "services.s6.hover": { fr: "Pas du contenu pour remplir. Un propos, un rythme, une présence.", en: "Not content for the sake of filling space. A point, a rhythm, a presence." },
  "services.s7.title": { fr: "Community\nManagement", en: "Community\nManagement" },
  "services.s7.desc": { fr: "Présence digitale, contenus sociaux, planning éditorial et engagement.", en: "Digital presence, social content, editorial planning and engagement." },
  "services.s7.hover": { fr: "Une voix régulière, lisible, qui parle aux gens sans leur crier dessus.", en: "A steady, readable voice that speaks to people without shouting at them." },
  "services.s8.title": { fr: "Web\nDesign", en: "Web\nDesign" },
  "services.s8.desc": { fr: "Interfaces web, UX/UI, maquettes et expériences digitales.", en: "Web interfaces, UX/UI, mockups and digital experiences." },
  "services.s8.hover": { fr: "Beau, oui. Mais surtout clair, fluide, agréable à parcourir.", en: "Beautiful, yes. But above all clear, smooth and easy to browse." },

  // ── Process ──
  "process.badge": { fr: "Processus", en: "Process" },
  "process.title1": { fr: "M\u00C9THODE.", en: "METHOD." },
  "process.title2": { fr: "cr\u00E9ative", en: "creative" },
  "process.intro": {
    fr: "Avant de poser une forme, une couleur ou un rythme, je cherche d’abord à comprendre ce que le projet veut réellement transmettre, pour transformer une intention floue en une expérience visuelle claire, sensible et vivante.",
    en: "Before shaping a form, a color, or a rhythm, I first seek to understand what the project truly needs to convey, so a blurred intention can become a clear, sensitive, and living visual experience.",
  },
  "process.step1.title": { fr: "\u00C9couter", en: "Listen" },
  "process.step1.desc": { fr: "Comprendre le projet, ses intentions, et ce qu'il doit vraiment transmettre.", en: "Understanding the project, its intentions, and what it truly needs to convey." },
  "process.step2.title": { fr: "Clarifier", en: "Clarify" },
  "process.step2.desc": { fr: "Organiser les idées, trouver une direction claire, sans lisser la personnalité.", en: "Organizing the ideas, finding a clear direction, without smoothing out the personality." },
  "process.step3.title": { fr: "Affiner", en: "Refine" },
  "process.step3.desc": { fr: "Travailler les équilibres, les contrastes et les rythmes jusqu'à ce que tout semble naturel.", en: "Working the balance, contrasts and rhythm until everything feels natural." },
  "process.step4.title": { fr: "Transmettre", en: "Hand Over" },
  "process.step4.desc": { fr: "Livrer un ensemble cohérent, solide, vivant, prêt à évoluer dans le temps.", en: "Delivering a coherent, solid and living whole, ready to evolve over time." },

  // ── Tools ──
  "tools.badge": { fr: "Outils", en: "Tools" },

  // ── Work (home) ──
  "work.badge": { fr: "Projets", en: "Work" },
  "work.title1": { fr: "S\u00C9LECTION.", en: "SELECTED." },
  "work.title2": { fr: "projets", en: "work" },
  "work.viewAll": { fr: "Voir Tout", en: "View All" },
  "work.p1.cat": { fr: "Marque & Web Design", en: "Brand & Web Design" },
  "work.p2.cat": { fr: "Produit Digital", en: "Digital Product" },
  "work.p3.cat": { fr: "Direction Cr\u00E9ative", en: "Creative Direction" },

  // ── CTA ──
  "cta.badge": { fr: "Une idée en tête ?", en: "Got an idea?" },
  "cta.title1": { fr: "CRÉONS.", en: "LET'S CREATE." },
  "cta.title2": { fr: "ensemble", en: "together" },
  "cta.button": { fr: "On en parle ?", en: "Tell Us About It" },

  // ── Contact ──
  "contact.badge": { fr: "Contact", en: "Contact" },
  "contact.title1": { fr: "PARLONS.", en: "LET'S TALK." },
  "contact.title2": { fr: "projet", en: "project" },
  "contact.intro": {
    fr: "Une idée nette, floue, ambitieuse ou encore en brouillon ? Partagez quelques lignes, on voit ensemble par où commencer.",
    en: "A clear, blurry, ambitious or still half-formed idea? Share a few lines and we will see together where to begin.",
  },
  "contact.name": { fr: "Nom", en: "Name" },
  "contact.email": { fr: "Email", en: "Email" },
  "contact.type": { fr: "Type de projet", en: "Project type" },
  "contact.typePlaceholder": { fr: "Sélectionner", en: "Select" },
  "contact.type.identity": { fr: "Identité visuelle", en: "Visual identity" },
  "contact.type.artDirection": { fr: "Direction artistique", en: "Art direction" },
  "contact.type.web": { fr: "Web / interface", en: "Web / interface" },
  "contact.type.motion": { fr: "Motion / contenu", en: "Motion / content" },
  "contact.type.other": { fr: "Autre", en: "Other" },
  "contact.message": { fr: "Message", en: "Message" },
  "contact.submit": { fr: "Envoyer le brief", en: "Send brief" },
  "contact.sentTitle": { fr: "Brief reçu.", en: "Brief received." },
  "contact.sentDesc": {
    fr: "Le formulaire est prêt côté interface. Pour l'instant, aucun email automatique n'est envoyé : cette confirmation prépare l'intégration future avec Vercel, Formspree ou Resend.",
    en: "The form interface is ready. For now, no automatic email is sent: this confirmation prepares a future integration with Vercel, Formspree or Resend.",
  },
  "contact.sendAnother": { fr: "Écrire un autre message", en: "Write another message" },
  "contact.emailAlt": { fr: "Alternative directe", en: "Direct alternative" },

  // ── Footer ──
  "footer.copy": {
    fr: "\u00A9 2026 Zul\u00E2l Aybek. Tous droits r\u00E9serv\u00E9s.",
    en: "\u00A9 2026 Zul\u00E2l Aybek. All rights reserved.",
  },

  // ── Projects Page ──
  "projects.heroLabel": { fr: "Portfolio / Index", en: "Portfolio / Index" },
  "projects.count": { fr: "Projets", en: "Projects" },
  "projects.title1": { fr: "PROJETS", en: "SELECTED" },
  "projects.title2": { fr: "focus", en: "WORKS" },
  "projects.subtitle": {
    fr: "Des idées qui prennent forme.",
    en: "Ideas taking shape.",
  },
  "projects.featured": { fr: "En vedette", en: "Featured" },
  "projects.indexLabel": { fr: "Index des Projets", en: "Project Index" },
  "projects.noMatch": {
    fr: "Aucun projet ne correspond \u00E0 ce filtre.",
    en: "No projects match this filter.",
  },
  "projects.reelLabel": { fr: "Galerie Visuelle", en: "Visual Reel" },
  "projects.reelTitle": {
    fr: "Parcourir la collection",
    en: "Browse the collection",
  },
  "projects.duration": { fr: "Dur\u00E9e", en: "Duration" },
  "projects.durationVal": { fr: "12 Semaines", en: "12 Weeks" },
  "projects.deliverables": { fr: "Livrables", en: "Deliverables" },
  "projects.year": { fr: "Ann\u00E9e", en: "Year" },
  "projects.viewCase": {
    fr: "Voir l\u2019\u00E9tude compl\u00E8te",
    en: "View Full Case",
  },
  "projects.next": { fr: "Projet Suivant", en: "Next Project" },

  // ── Categories ──
  "cat.all": { fr: "Tous", en: "All" },
  "cat.identity": { fr: "Identité visuelle", en: "Visual Identity" },
  "cat.digital": { fr: "Digital & UX", en: "Digital & UX" },
  "cat.communication": { fr: "Communication", en: "Communication" },
  "cat.event": { fr: "Événementiel", en: "Event" },

  // ── View modes ──
  "view.standard": { fr: "Tous", en: "All" },
  "view.projects": { fr: "Projets", en: "Projects" },
  "view.workshops": { fr: "Workshops", en: "Workshops" },
  "badge.workshop": { fr: "Workshop", en: "Workshop" },

  // ── SNCF Connect & Tech Project ──
  "sncf.back": { fr: "Retour aux projets", en: "Back to projects" },
  "sncf.hero.label": { fr: "Workshop", en: "Workshop" },
  "sncf.hero.year": { fr: "2024", en: "2024" },
  "sncf.intro.desc": {
    fr: "Workshop de design UX mené dans le cadre d'un partenariat avec SNCF Connect & Tech. L'objectif : repenser l'expérience utilisateur de l'application SNCF Connect pour les trajets du quotidien, en proposant une personnalisation poussée de l'écran d'accueil et une nouvelle fonctionnalité « Connect Routine ».",
    en: "UX design workshop conducted in partnership with SNCF Connect & Tech. The goal: rethink the user experience of the SNCF Connect app for daily commutes, proposing advanced home screen personalization and a new 'Connect Routine' feature.",
  },
  "sncf.prez.label": { fr: "Présentation", en: "Presentation" },
  "sncf.onboarding.label": { fr: "Application", en: "Application" },
  "sncf.onboarding.title": { fr: "Onboarding de l'application", en: "App Onboarding" },
  "sncf.onboarding.desc": {
    fr: "Parcours d'introduction de l'application SNCF Connect repensé, présentant les nouvelles fonctionnalités de personnalisation et de routines quotidiennes.",
    en: "Redesigned SNCF Connect app onboarding flow, showcasing new personalization features and daily routine capabilities.",
  },
  "proj.sncf.desc": {
    fr: "Workshop UX avec SNCF Connect & Tech : repenser l'expérience de mobilité quotidienne et la personnalisation de l'application.",
    en: "UX workshop with SNCF Connect & Tech: rethinking the daily mobility experience and app personalization.",
  },

  // ── Collectif Haïti de France Project ──
  "haiti.back": { fr: "Retour aux projets", en: "Back to projects" },
  "haiti.hero.label": { fr: "Workshop", en: "Workshop" },
  "haiti.hero.year": { fr: "2024", en: "2024" },
  "haiti.hero.subtitle": {
    fr: "Workshop de refonte d'identité visuelle pour une association engagée",
    en: "Visual identity redesign workshop for an engaged association",
  },
  "haiti.intro.desc": {
    fr: "Ce projet de workshop portait sur la refonte de l'identité visuelle du Collectif Haïti de France. L'objectif était de concevoir un système graphique plus lisible, plus cohérent et plus actuel, capable d'accompagner les prises de parole du collectif sur différents supports.",
    en: "This workshop project focused on redesigning the visual identity of Collectif Haïti de France. The goal was to create a more legible, coherent and contemporary graphic system to support the collective's communications across various media.",
  },
  "haiti.direction.title": { fr: "Direction visuelle", en: "Visual direction" },
  "haiti.direction.desc": {
    fr: "L'identité a été pensée comme un système souple, capable d'exister à plusieurs niveaux de lecture. Le logo principal rassemble quatre signes distincts, chacun associé à une thématique portée par le collectif.",
    en: "The identity was designed as a flexible system, capable of existing on multiple levels. The main logo brings together four distinct signs, each associated with a theme carried by the collective.",
  },
  "haiti.enjeu.title": { fr: "Enjeu du projet", en: "Project challenge" },
  "haiti.enjeu.desc": {
    fr: "L'enjeu était de créer une identité capable de traduire la diversité des engagements du collectif sans perdre en clarté. Il fallait construire un langage visuel assez simple pour être immédiatement lisible, mais suffisamment structuré pour fonctionner sur des supports variés.",
    en: "The challenge was to create an identity that could convey the diversity of the collective's commitments without losing clarity. The visual language needed to be simple enough for immediate readability, yet structured enough to work across various media.",
  },
  "haiti.logo.title": { fr: "Logo", en: "Logo" },
  "haiti.logoConcept.title": { fr: "Logo concept", en: "Logo concept" },
  "haiti.logoConcept.desc": {
    fr: "Le logotype repose sur l'assemblage de quatre icônes complémentaires. Chaque élément possède sa propre fonction dans l'identité, tout en participant à l'équilibre du logo global.",
    en: "The logotype is based on the assembly of four complementary icons. Each element has its own function within the identity, while contributing to the overall balance.",
  },
  "haiti.icono.title": { fr: "Iconographie", en: "Iconography" },
  "haiti.icono.desc": {
    fr: "Les quatre icônes ont été conçues pour représenter les grands axes du collectif. Cette iconographie permet de hiérarchiser les messages et d'utiliser les signes séparément selon les besoins de communication.",
    en: "The four icons were designed to represent the collective's main pillars. This iconography helps prioritize messages and allows signs to be used separately as needed.",
  },
  "haiti.decli.title": { fr: "Déclinaisons", en: "Variations" },
  "haiti.decli.desc": {
    fr: "Le projet inclut plusieurs déclinaisons colorées du logo, pensées pour assurer sa lisibilité et son adaptabilité selon les supports.",
    en: "The project includes several color variations of the logo, designed to ensure readability and adaptability across media.",
  },
  "haiti.pattern.title": { fr: "Pattern", en: "Pattern" },
  "haiti.pattern.desc": {
    fr: "Le pattern reprend la logique modulaire du logo en réutilisant les quatre icônes comme unités graphiques, prolongeant l'identité dans un registre plus décoratif et systémique.",
    en: "The pattern follows the modular logic of the logo by reusing the four icons as graphic units, extending the identity into a more decorative and systematic register.",
  },
  "haiti.apps.title": { fr: "Applications", en: "Applications" },
  "haiti.apps.desc": {
    fr: "La refonte a été pensée dans une logique de déploiement plus large, avec des applications sur le site web, les réseaux sociaux et la vidéo, afin d'inscrire l'identité dans un usage réel et cohérent.",
    en: "The redesign was developed for broader deployment, with applications on the website, social media and video, to embed the identity in real and coherent usage.",
  },
  "proj.haiti.desc": {
    fr: "Workshop de refonte d'identité visuelle pour le Collectif Haïti de France. Système graphique modulaire, iconographie et déclinaisons.",
    en: "Visual identity redesign workshop for Collectif Haïti de France. Modular graphic system, iconography and variations.",
  },
  "proj.parsemains.desc": {
    fr: "Page projet préparée. Les contenus, visuels et intentions seront ajoutés prochainement.",
    en: "Project page prepared. Content, visuals and direction will be added soon.",
  },

  // ── Project descriptions (by id) ──
  "proj.mya.desc": {
    fr: "Création d'une identité visuelle complète pour une marque de bijoux artisanale. Du logo aux applications, chaque élément reflète élégance et intemporalité.",
    en: "Complete visual identity creation for an artisan jewelry brand. From logo to applications, every element reflects elegance and timelessness.",
  },
  "proj.roma.desc": {
    fr: "Conception d'affiches à partir d'un travail photographique dans le 6ᵉ arrondissement de Paris. Design éditorial sobre et structuré au service du patrimoine architectural.",
    en: "Poster design from photographic work in the 6th arrondissement of Paris. Sober and structured editorial design in service of architectural heritage.",
  },
  "proj.1.desc": {
    fr: "Une refonte compl\u00E8te pour un laboratoire de recherche IA, fusionnant rigueur scientifique et langage visuel audacieux. Nous avons con\u00E7u un syst\u00E8me qui relie la deep tech \u00E0 la chaleur humaine.",
    en: "A complete rebrand for an AI research lab, fusing scientific rigor with bold visual language. We crafted a system that bridges the gap between deep tech and human warmth.",
  },
  "proj.2.desc": {
    fr: "Une plateforme SaaS nouvelle g\u00E9n\u00E9ration con\u00E7ue pour la collaboration en temps r\u00E9el des \u00E9quipes entreprise. Des interfaces fluides et un design pilot\u00E9 par la donn\u00E9e.",
    en: "A next-gen SaaS platform designed for enterprise teams to collaborate in real-time. Fluid interfaces and data-driven design at its finest.",
  },
  "proj.3.desc": {
    fr: "Direction artistique \u00E9ditoriale pour une maison de haute couture red\u00E9finissant le luxe sombre. Chaque d\u00E9tail murmure la sophistication.",
    en: "Editorial art direction for a high-end fashion house redefining dark luxury. Every detail whispers sophistication.",
  },
  "proj.4.desc": {
    fr: "Une marque de bien-\u00EAtre botanique construite du sol \u00E0 l\u2019\u00E9cran \u2014 organique dans tous les sens. Nous avons fa\u00E7onn\u00E9 une identit\u00E9 vivante enracin\u00E9e dans la nature.",
    en: "A botanical wellness brand built from soil to screen \u2014 organic in every sense. We shaped a living identity rooted in nature.",
  },
  "proj.5.desc": {
    fr: "Un showroom digital immersif pour un cabinet d\u2019architecture sp\u00E9cialis\u00E9 dans les espaces minimalistes. La lumi\u00E8re comme mat\u00E9riau.",
    en: "An immersive digital showroom for an architecture firm specializing in minimalist spaces. Light as the material.",
  },
  "proj.6.desc": {
    fr: "Motion design cin\u00E9matique et CGI pour le lancement d\u2019un v\u00E9hicule concept \u00E9lectrique. La vitesse rendue visible.",
    en: "Cinematic motion design and CGI for the launch of an electric concept vehicle. Speed made visible.",
  },
  "proj.7.desc": {
    fr: "Sculptures 3D abstraites explorant la relation entre le temps, la forme et la mati\u00E8re. L\u2019art rencontre l\u2019algorithme.",
    en: "Abstract 3D sculptures exploring the relationship between time, form and material. Art meets algorithm.",
  },
  "proj.8.desc": {
    fr: "Strat\u00E9gie de positionnement pour un cabinet de design, du naming \u00E0 l\u2019identit\u00E9 go-to-market compl\u00E8te. La pens\u00E9e rendue tangible.",
    en: "A design consultancy positioning strategy, from naming to full go-to-market identity. Thinking made tangible.",
  },

  // ── Project tags ──
  "tag.identity": { fr: "Identit\u00E9", en: "Identity" },
  "tag.webDesign": { fr: "Web Design", en: "Web Design" },
  "tag.product": { fr: "Produit", en: "Product" },
  "tag.uxui": { fr: "UX/UI", en: "UX/UI" },
  "tag.fashion": { fr: "Mode", en: "Fashion" },
  "tag.editorial": { fr: "\u00C9ditorial", en: "Editorial" },
  "tag.creativeDir": { fr: "Direction Cr\u00E9ative", en: "Creative Direction" },
  "tag.branding": { fr: "Branding", en: "Branding" },
  "tag.web": { fr: "Web", en: "Web" },
  "tag.3dExp": { fr: "Exp\u00E9rience 3D", en: "3D Experience" },
  "tag.motionDesign": { fr: "Motion Design", en: "Motion Design" },
  "tag.3d": { fr: "3D", en: "3D" },
  "tag.3dArt": { fr: "Art 3D", en: "3D Art" },
  "tag.installation": { fr: "Installation", en: "Installation" },
  "tag.consulting": { fr: "Consulting", en: "Consulting" },
  "tag.brandStrategy": {
    fr: "Strat\u00E9gie de Marque",
    en: "Brand Strategy",
  },

  // ── MYA Project Case Study ──
  "mya.hero.label": { fr: "Étude de cas", en: "Case Study" },
  "mya.hero.year": { fr: "2026", en: "2026" },
  "mya.intro.title": { fr: "MYA", en: "MYA" },
  "mya.intro.subtitle": {
    fr: "Identité visuelle pour une marque de bijoux",
    en: "Visual identity for a jewelry brand",
  },
  "mya.intro.desc": {
    fr: "Créé pour une marque de bijoux, le projet MYA repose sur la conception d'un logo pensé comme un signe à la fois délicat, raffiné et mémorable.",
    en: "Created for a jewelry brand, the MYA project centers on a logo designed as a sign that is both delicate, refined and memorable.",
  },
  "mya.context.label": { fr: "Contexte", en: "Context" },
  "mya.context.text": {
    fr: "Concevoir une identité visuelle capable d'incarner un positionnement élégant et intemporel, tout en assurant lisibilité, adaptabilité et cohérence sur différents supports.",
    en: "Design a visual identity that embodies an elegant and timeless positioning, while ensuring readability, adaptability and consistency across different media.",
  },
  "mya.logo.label": { fr: "Logo", en: "Logo" },
  "mya.intention.label": { fr: "Intention", en: "Intention" },
  "mya.intention.text": {
    fr: "Le logo s'inspire de la forme du lotus, choisi pour sa symbolique de pureté, d'harmonie et d'élévation. Retravaillé dans une écriture géométrique et épurée, il devient un signe ornemental équilibré, en cohérence avec l'univers de la joaillerie.",
    en: "The logo draws inspiration from the lotus flower, chosen for its symbolism of purity, harmony and elevation. Reworked into a geometric and refined script, it becomes a balanced ornamental sign, in harmony with the world of jewelry.",
  },
  "mya.construction.label": { fr: "Construction", en: "Construction" },
  "mya.construction.text": {
    fr: "La construction symétrique renforce l'idée de finesse, de stabilité et de sophistication.",
    en: "The symmetrical construction reinforces the idea of finesse, stability and sophistication.",
  },
  "mya.variants.label": { fr: "Déclinaisons", en: "Variants" },
  "mya.palette.label": { fr: "Palette", en: "Palette" },
  "mya.typo.label": { fr: "Typographie", en: "Typography" },
  "mya.process.label": { fr: "Processus créatif", en: "Creative Process" },
  "mya.mockups.label": { fr: "Applications", en: "Applications" },
  "mya.final.label": { fr: "Résultat final", en: "Final Result" },
  "mya.final.text": {
    fr: "Une identité sobre, élégante et intemporelle — fidèle à l'univers précieux de MYA.",
    en: "A sober, elegant and timeless identity — true to the precious world of MYA.",
  },
  "mya.back": { fr: "Retour aux projets", en: "Back to projects" },

  // ── ROMA Project Case Study ──
  "roma.hero.label": { fr: "Étude de cas", en: "Case Study" },
  "roma.hero.year": { fr: "2021", en: "2021" },
  "roma.hero.title": { fr: "Affiches — Mairie de Paris", en: "Posters — City of Paris" },
  "roma.intro.subtitle": {
    fr: "Création d'affiches à partir d'un travail photographique réalisé dans le 6ᵉ arrondissement de Paris",
    en: "Poster design based on photographic work carried out in the 6th arrondissement of Paris",
  },
  "roma.intro.desc": {
    fr: "Pensé pour la Mairie de Paris, ce projet consistait à concevoir une série d'affiches à partir d'un travail photographique réalisé sur le terrain, dans le 6ᵉ arrondissement. L'objectif était de transformer ce repérage visuel en une proposition graphique capable de valoriser le patrimoine architectural du quartier à travers un langage sobre, structuré et contemporain.",
    en: "Designed for the City of Paris, this project involved creating a series of posters from photographic work carried out on location in the 6th arrondissement. The goal was to transform this visual survey into a graphic proposal that showcases the architectural heritage of the neighborhood through a sober, structured and contemporary language.",
  },
  "roma.context.label": { fr: "Contexte", en: "Context" },
  "roma.context.text": {
    fr: "Concevoir une série d'affiches cohérentes et lisibles, capables de traduire l'identité d'un territoire tout en proposant une interprétation visuelle adaptée à un support de communication institutionnel.",
    en: "Design a coherent and readable series of posters, capable of conveying the identity of a territory while offering a visual interpretation suited to an institutional communication medium.",
  },
  "roma.photos.label": { fr: "Photographies", en: "Photographs" },
  "roma.triptych.label": { fr: "Triptyque", en: "Triptych" },
  "roma.direction.label": { fr: "Direction visuelle", en: "Visual Direction" },
  "roma.direction.text": {
    fr: "Le projet s'est construit autour d'un dialogue entre photographie, composition éditoriale et typographie, avec une attention particulière portée au cadrage, à la hiérarchie des informations et à la mise en valeur des formes architecturales. L'intervention graphique, discrète mais structurante, permet d'unifier la série et d'inscrire les affiches dans un système visuel cohérent.",
    en: "The project was built around a dialogue between photography, editorial composition and typography, with particular attention to framing, information hierarchy and the enhancement of architectural forms. The graphic intervention, discreet yet structural, unifies the series and places the posters within a coherent visual system.",
  },
  "roma.posters.label": { fr: "Affiches", en: "Posters" },
  "roma.choices.label": { fr: "Choix graphiques", en: "Graphic Choices" },
  "roma.choices.text": {
    fr: "Le choix d'une mise en page épurée permet de laisser une place centrale à l'architecture et à la qualité des prises de vue. La typographie, élégante et structurée, apporte un cadre sobre qui renforce la lisibilité de l'ensemble, tandis que les formes graphiques translucides introduisent un rythme visuel récurrent, pensé pour relier les affiches entre elles sans détourner l'attention du sujet. La palette neutre prolonge directement les tonalités minérales du paysage urbain et soutient une lecture à la fois patrimoniale et contemporaine.",
    en: "The choice of a clean layout gives a central place to architecture and the quality of the shots. The elegant, structured typography provides a sober framework that reinforces overall readability, while translucent graphic shapes introduce a recurring visual rhythm designed to link the posters together without diverting attention from the subject. The neutral palette directly extends the mineral tones of the urban landscape and supports both a heritage and contemporary reading.",
  },
  "roma.final.label": { fr: "Résultat final", en: "Final Result" },
  "roma.final.text": {
    fr: "Une série d'affiches qui allie rigueur graphique et sensibilité photographique — au service du patrimoine architectural parisien.",
    en: "A poster series combining graphic rigor and photographic sensitivity — in service of Parisian architectural heritage.",
  },
  "roma.back": { fr: "Retour aux projets", en: "Back to projects" },

  // ── MAKER WEEK Project Case Study ──
  "mw.hero.label": { fr: "Étude de cas", en: "Case Study" },
  "mw.hero.year": { fr: "2022", en: "2022" },
  "mw.hero.hint": { fr: "Touchez pour faire tourner", en: "Drag to rotate" },
  "mw.intro.subtitle": {
    fr: "Création d'identité visuelle et de supports de communication pour un événement étudiant",
    en: "Visual identity and communication design for a student event",
  },
  "mw.intro.desc": {
    fr: "Maker Week est un projet de communication visuelle développé pour un événement organisé par Digital Campus, école spécialisée dans les métiers du digital et de la création. Aucune direction artistique n'existait au départ : le projet consistait donc à imaginer un univers graphique complet, puis à le décliner sur un ensemble de supports print et événementiels.",
    en: "Maker Week is a visual communication project developed for an event organized by Digital Campus, a school specializing in digital and creative fields. No art direction existed initially: the project required imagining a complete graphic universe, then adapting it across a range of print and event materials.",
  },
  "mw.context.label": { fr: "Contexte", en: "Context" },
  "mw.context.text": {
    fr: "L'enjeu était de créer une direction artistique complète, suffisamment forte pour unifier l'ensemble de la communication de l'événement. Il fallait imaginer un univers visuel déclinable, lisible et identifiable, capable de fonctionner aussi bien sur des supports éditoriaux que dans l'espace événementiel.",
    en: "The challenge was to create a complete art direction, strong enough to unify all event communications. It required imagining a visual universe that was adaptable, readable and identifiable, capable of working equally well on editorial materials and in the event space.",
  },
  "mw.direction.label": { fr: "Direction visuelle", en: "Visual Direction" },
  "mw.direction.text": {
    fr: "Le système visuel s'appuie sur une composition typographique à fort impact, associée à une matière colorée plus fluide et plus immersive. Cette dualité permet de construire une identité immédiatement reconnaissable, à la fois structurée, énergique et contemporaine, capable de s'adapter à des supports très variés sans perdre en cohérence.",
    en: "The visual system relies on high-impact typographic composition, paired with a more fluid and immersive color treatment. This duality builds an immediately recognizable identity, both structured, energetic and contemporary, able to adapt to widely varied formats without losing coherence.",
  },
  "mw.choices.label": { fr: "Choix graphiques", en: "Graphic Choices" },
  "mw.choices.text": {
    fr: "La typographie a été pensée comme un élément d'impact, destiné à installer immédiatement le nom de l'événement dans l'espace visuel. En parallèle, les flux colorés viennent apporter mouvement, profondeur et intensité, afin de traduire l'idée d'expérimentation, de créativité et d'hybridation entre disciplines. L'ensemble a été conçu comme un système modulaire, permettant une déclinaison cohérente sur tous les formats.",
    en: "Typography was designed as an impact element, intended to immediately establish the event name in the visual space. In parallel, colored flows bring movement, depth and intensity, conveying the idea of experimentation, creativity and cross-disciplinary hybridization. The whole was conceived as a modular system, allowing coherent adaptation across all formats.",
  },
  "mw.palette.label": { fr: "Palette chromatique", en: "Color Palette" },
  "mw.palette.text": {
    fr: "La palette articule des bleus électriques, des cyans diffus et des accents bordeaux. Le bleu ancre le projet dans un imaginaire technologique et digital, tandis que les contrastes froids insufflent énergie, tension et visibilité.",
    en: "The palette combines electric blues, diffuse cyans and burgundy accents. Blue anchors the project in a technological and digital imaginary, while cool contrasts bring energy, tension and visibility.",
  },
  "mw.logo.label": { fr: "Logo", en: "Logo" },
  "mw.editorial.label": { fr: "Supports éditoriaux", en: "Editorial Materials" },
  "mw.editorial.poster": { fr: "Affiche principale", en: "Main poster" },
  "mw.editorial.brochure": { fr: "Brochure", en: "Brochure" },
  "mw.event.label": { fr: "Supports événementiels", en: "Event Materials" },
  "mw.event.text": {
    fr: "Le système visuel a été décliné sur l'ensemble des supports physiques de l'événement : kakemonos, affiches directionnelles, signalétique d'ateliers et photocall. Chaque support conserve l'identité graphique tout en s'adaptant aux contraintes de format et de lisibilité propres à l'espace événementiel.",
    en: "The visual system was adapted across all physical event materials: kakemonos, directional posters, workshop signage and photocall. Each piece maintains the graphic identity while adapting to the format and readability constraints of the event space.",
  },
  "mw.gallery.label": { fr: "Galerie", en: "Gallery" },
  "mw.final.label": { fr: "Résultat final", en: "Final Result" },
  "mw.final.text": {
    fr: "Un univers visuel complet et modulaire — de l'affiche au photocall, une identité immédiatement reconnaissable au service de l'événement.",
    en: "A complete and modular visual universe — from poster to photocall, an immediately recognizable identity in service of the event.",
  },
  "mw.back": { fr: "Retour aux projets", en: "Back to projects" },

  // ── MZW — No Sense ──
  "mzw.hero.label": { fr: "Direction Artistique", en: "Art Direction" },
  "mzw.hero.year": { fr: "2022", en: "2022" },
  "mzw.intro.subtitle": {
    fr: "Direction artistique complète pour un groupe de musique électro fictif.",
    en: "Complete art direction for a fictional electronic music group.",
  },
  "mzw.intro.desc": {
    fr: "Le projet déploie une direction graphique nocturne, digitale et musicale, pensée pour vivre sur affiche, vinyle, merchandising, interface mobile et prototype web.",
    en: "The project develops a nocturnal, digital and musical graphic direction, designed to live across posters, vinyl, merchandising, mobile interface and web prototype.",
  },
  "mzw.context.label": { fr: "Contexte", en: "Context" },
  "mzw.context.text": {
    fr: "L'enjeu : donner au groupe une présence immédiatement reconnaissable, avec un système clair, cohérent et adaptable, capable de passer du print à l'expérience digitale.",
    en: "The challenge: give the group an immediately recognizable presence, with a clear, consistent and adaptable system, able to move from print to digital experience.",
  },
  "mzw.direction.label": { fr: "Direction visuelle", en: "Visual Direction" },
  "mzw.direction.text": {
    fr: "La direction repose sur une composition centrale forte, presque emblématique. Autour d'elle, les lignes topographiques installent un rythme : ondes sonores, vibrations, profondeur et énergie électronique.",
    en: "The direction is built around a strong central composition, almost emblematic. Around it, topographic lines create rhythm: sound waves, vibrations, depth and electronic energy.",
  },
  "mzw.choices.label": { fr: "Choix graphiques", en: "Graphic Choices" },
  "mzw.choices.text": {
    fr: "Le logo joue sur la tension entre lisibilité et expérimentation. Sa symétrie lui donne une présence sculpturale, tandis que les contrastes colorés traduisent une matière sonore en mouvement.",
    en: "The logo plays with the tension between readability and experimentation. Its symmetry gives it a sculptural presence, while color contrasts suggest sonic matter in motion.",
  },
  "mzw.palette.label": { fr: "Palette chromatique", en: "Color Palette" },
  "mzw.palette.text": {
    fr: "Bleu profond, violet, magenta, cuivre et jaune composent une palette nocturne et sensorielle, entre profondeur, tension et éclats lumineux.",
    en: "Deep blue, violet, magenta, copper and yellow shape a nocturnal, sensory palette, between depth, tension and luminous bursts.",
  },
  "mzw.print.label": { fr: "Supports print", en: "Print Materials" },
  "mzw.print.text": {
    fr: "L'affiche A3 concentre le système graphique dans un format événementiel : un point d'entrée lisible, frontal et mémorisable.",
    en: "The A3 poster concentrates the graphic system into an event format: a readable, direct and memorable entry point.",
  },
  "mzw.merch.label": { fr: "Merchandising", en: "Merchandising" },
  "mzw.merch.text": {
    fr: "Le textile reprend le signe MZW avec retenue, comme une extension portable du projet, entre objet de groupe et pièce graphique.",
    en: "The textile piece uses the MZW mark with restraint, as a wearable extension of the project, between band object and graphic piece.",
  },
  "mzw.vinyl.label": { fr: "Pochette vinyle", en: "Vinyl Sleeve" },
  "mzw.mobile.label": { fr: "Interface mobile", en: "Mobile Interface" },
  "mzw.mobile.text": {
    fr: "Le player mobile transpose la direction artistique dans une expérience d'écoute, entre pochette, contrôle, animation sonore et continuité digitale.",
    en: "The mobile player translates the art direction into a listening experience, between artwork, controls, animated sound and digital continuity.",
  },
  "mzw.mobile.anecdote": {
    fr: "« Schmetterling » signifie « papillon » en allemand : un lien direct entre le symbole, le son et l'univers du groupe.",
    en: "\"Schmetterling\" means \"butterfly\" in German: a direct link between the symbol, the sound and the group's universe.",
  },
  "mzw.mockups.label": { fr: "Mises en situation", en: "Mockups" },
  "mzw.final.label": { fr: "Clôture", en: "Closing" },
  "mzw.final.text": {
    fr: "Une direction artistique complète, pensée comme un système vivant : du signe au support, de l'objet imprimé à l'expérience web et mobile.",
    en: "A complete art direction, designed as a living system: from mark to medium, from printed object to web and mobile experience.",
  },
  "mzw.back": { fr: "Retour aux projets", en: "Back to projects" },
  "mzw.logo.label": { fr: "Logo", en: "Logo" },

  "mzw.name.label": { fr: "Construction du nom", en: "Name Construction" },
  "mzw.name.text": {
    fr: "MZW reprend les initiales des trois membres du groupe. Chaque lettre est associée à un mot allemand, en hommage aux origines allemandes de la musique électro.",
    en: "MZW takes the initials of the three group members. Each letter is paired with a German word, as a tribute to the German roots of electronic music.",
  },
  "mzw.baseline.label": { fr: "Baseline", en: "Baseline" },
  "mzw.baseline.text": {
    fr: "Mis ensemble, ces mots ne forment pas de sens clair. La baseline « No Sense » assume ce décalage et fait de l'ambiguïté un choix de ton.",
    en: "Placed together, these words do not form a clear meaning. The baseline \"No Sense\" embraces that shift and turns ambiguity into a tone of voice.",
  },
  "mzw.butterfly.label": { fr: "Choix du papillon", en: "Butterfly Choice" },
  "mzw.butterfly.text": {
    fr: "Le mot-signe et la baseline ont été travaillés pour faire émerger une silhouette de papillon. Le symbole introduit transformation, mouvement et vibration, tout en reliant le graphisme au son.",
    en: "The wordmark and baseline were shaped to reveal a butterfly silhouette. The symbol brings in transformation, movement and vibration, while linking the graphic language to sound.",
  },
  "mzw.intention.label": { fr: "Intention", en: "Intent" },
  "mzw.intention.text1": {
    fr: "L'intention était de créer une présence construite, expressive et légèrement énigmatique, capable de porter le caractère du groupe sans le figer.",
    en: "The intention was to create a structured, expressive and slightly enigmatic presence, able to carry the group's character without freezing it.",
  },
  "mzw.intention.text2": {
    fr: "Le projet cherche le dialogue entre structure et sensation : une écriture qui devient image, un rythme graphique qui accompagne le son, une esthétique digitale mais sensible.",
    en: "The project seeks a dialogue between structure and sensation: lettering that becomes image, a graphic rhythm that follows the sound, a digital yet sensory aesthetic.",
  },
  "mzw.vinyl.text": {
    fr: "La pochette vinyle condense le projet dans un objet iconique, à la fois graphique, musical et collectionnable.",
    en: "The vinyl sleeve condenses the project into an iconic object, at once graphic, musical and collectible.",
  },

  // ── Project description for listing ──
  "proj.mw.desc": {
    fr: "Identité visuelle complète et déclinaison sur supports print et événementiels pour la Maker Week, événement organisé par Digital Campus.",
    en: "Complete visual identity and adaptation across print and event materials for Maker Week, an event organized by Digital Campus.",
  },
  "proj.mzw.desc": {
    fr: "Identité visuelle complète pour un groupe de musique électro fictif : affiche, vinyle, merchandising et interface mobile.",
    en: "Complete visual identity for a fictional electronic music group: poster, vinyl, merchandising, and mobile interface.",
  },
  "tag.eventDesign": { fr: "Événementiel", en: "Event Design" },
  "tag.musicIdent": { fr: "Identité Musicale", en: "Music Identity" },
  "tag.uiDesign": { fr: "UI Design", en: "UI Design" },

  // ── KH — KittyHub ──
  "kh.hero.label": { fr: "Concept Digital", en: "Digital Concept" },
  "kh.hero.year": { fr: "2026", en: "2026" },
  "kh.intro.tag": { fr: "Plateforme Pokémon", en: "Pokémon Platform" },
  "kh.intro.subtitle": {
    fr: "Création d'un concept digital innovant à impact positif dédié aux cartes Pokémon.",
    en: "Creation of an innovative digital concept with positive impact dedicated to Pokémon cards.",
  },
  "kh.intro.desc": {
    fr: "KittyHub est un projet digital imaginé autour de l'univers des cartes Pokémon. Le projet a été pensé dans sa globalité, de l'idée initiale à sa traduction visuelle, avec une réflexion portant sur le concept, le positionnement, l'expérience proposée et l'univers graphique. L'objectif était de concevoir une plateforme réunissant collection, communauté, estimation et interface digitale dans un même écosystème cohérent et contemporain.",
    en: "KittyHub is a digital project imagined around the Pokémon card universe. The project was designed holistically, from the initial idea to its visual translation, with reflection on concept, positioning, proposed experience, and graphic universe. The goal was to design a platform uniting collection, community, estimation, and digital interface within a single coherent and contemporary ecosystem.",
  },
  "kh.context.label": { fr: "Contexte", en: "Context" },
  "kh.context.text": {
    fr: "L'enjeu était de construire un projet complet, aussi bien dans son fond que dans sa forme, en faisant coexister plusieurs dimensions au sein d'une même plateforme : la collection, la communauté, l'estimation et la donnée. Il fallait imaginer un concept suffisamment fort pour être mémorable, tout en le traduisant dans un système visuel lisible, attractif et cohérent.",
    en: "The challenge was to build a complete project, both in substance and form, by bringing together multiple dimensions within a single platform: collection, community, estimation, and data. It required imagining a concept strong enough to be memorable, while translating it into a readable, attractive, and coherent visual system.",
  },
  "kh.direction.label": { fr: "Direction du projet", en: "Project Direction" },
  "kh.direction.text": {
    fr: "KH a été conçu comme un projet complet, articulant logique produit, expérience utilisateur et identité visuelle. L'ambition était de construire un concept crédible, structuré et engageant, capable de faire dialoguer culture pop, interface contemporaine et usage digital.",
    en: "KH was designed as a complete project, articulating product logic, user experience, and visual identity. The ambition was to build a credible, structured, and engaging concept, capable of bringing together pop culture, contemporary interface, and digital usage.",
  },
  "kh.visual.label": { fr: "Direction visuelle", en: "Visual Direction" },
  "kh.visual.text": {
    fr: "L'univers graphique repose sur des interfaces sombres, des blocs colorés à fort impact et une composition modulaire inspirée des codes du digital product design. L'ensemble mêle références à l'univers Pokémon, hiérarchie visuelle claire et logique d'interface afin de donner au projet une identité dynamique et immédiatement identifiable.",
    en: "The graphic universe is based on dark interfaces, high-impact colored blocks, and a modular composition inspired by digital product design codes. The whole blends references to the Pokémon universe, clear visual hierarchy, and interface logic to give the project a dynamic and immediately identifiable identity.",
  },
  "kh.palette.label": { fr: "Palette chromatique", en: "Color Palette" },
  "kh.palette.text": {
    fr: "La palette associe des roses froids, des violets, des bleus lumineux et des fonds noirs profonds. Les accents colorés servent de points d'accroche visuels tandis que les violets apportent profondeur et continuité.",
    en: "The palette combines cool pinks, purples, luminous blues and deep black backgrounds. Colored accents serve as visual focal points while purples bring depth and continuity.",
  },
  "kh.typo.label": { fr: "Typographie", en: "Typography" },
  "kh.typo.desc": {
    fr: "Darker Grotesque est un grotesque contemporain conçu par Gabriel Lam, inspiré par les tendances typographiques postmodernes et brutalistes.",
    en: "Darker Grotesque is a contemporary grotesque designed by Gabriel Lam, inspired by postmodern and brutalist typographic trends.",
  },
  "kh.logo.label": { fr: "Logo", en: "Logo" },
  "kh.icons.label": { fr: "App Icons", en: "App Icons" },
  "kh.cards.label": { fr: "Système visuel", en: "Visual System" },
  "kh.cards.text": {
    fr: "La direction artistique s'appuie sur un système de cards structuré, inspiré d'une logique modulaire proche du Bento UI, afin d'organiser l'information de manière claire tout en conservant un fort impact visuel.",
    en: "The art direction relies on a structured card system, inspired by a modular logic close to Bento UI, to organize information clearly while maintaining strong visual impact.",
  },
  "kh.ipad.label": { fr: "Application iPad", en: "iPad Application" },
  "kh.ipad.text": {
    fr: "L'application a été imaginée et conçue pour iPad, en exploitant la surface d'écran étendue pour offrir une expérience immersive et fluide.",
    en: "The application was imagined and designed for iPad, leveraging the extended screen surface to offer an immersive and fluid experience.",
  },
  "kh.ipad.cta": { fr: "Voir le prototype", en: "View prototype" },
  "kh.interface.label": { fr: "Interface utilisateur", en: "User Interface" },
  "kh.interface.text": {
    fr: "Les compositions alternent chiffres-clés, éléments d'interface, zones de respiration et références à l'univers Pokémon pour rendre l'ensemble plus vivant et engageant.",
    en: "The compositions alternate key figures, interface elements, breathing zones, and references to the Pokémon universe to make the whole more lively and engaging.",
  },
  "kh.bento.label": { fr: "Présentation Bento UI", en: "Bento UI Presentation" },
  "kh.team.label": { fr: "Équipe", en: "Team" },
  "kh.mockups.label": { fr: "Mises en situation", en: "Mockups" },
  "kh.mockups.text": {
    fr: "Déclinaison du concept sur différents supports physiques pour donner au projet une dimension tangible et immersive.",
    en: "Adaptation of the concept across different physical formats to give the project a tangible and immersive dimension.",
  },
  "kh.final.label": { fr: "Merci", en: "Thank You" },
  "kh.final.text": {
    fr: "KittyHub est un projet pensé dans sa globalité, du concept initial à sa traduction visuelle. Un écosystème digital complet au service de la collection, de la communauté et de l'estimation.",
    en: "KittyHub is a project designed holistically, from the initial concept to its visual translation. A complete digital ecosystem serving collection, community, and estimation.",
  },
  "kh.back": { fr: "Retour aux projets", en: "Back to projects" },
  "proj.kh.desc": {
    fr: "Concept digital innovant dédié aux cartes Pokémon : identité visuelle, interface web & mobile, système de cards modulaire.",
    en: "Innovative digital concept dedicated to Pokémon cards: visual identity, web & mobile interface, modular card system.",
  },
  "tag.concept": { fr: "Concept", en: "Concept" },
  "tag.appDesign": { fr: "App Design", en: "App Design" },

  // ── SNATSH ──
  "sn.hero.label": { fr: "Production Audiovisuelle", en: "Audiovisual Production" },
  "sn.hero.year": { fr: "2026", en: "2026" },
  "sn.intro.tag": { fr: "Identité Visuelle & Supports", en: "Visual Identity & Materials" },
  "sn.intro.subtitle": {
    fr: "Création d'univers visuel et de supports de communication pour une agence de production audiovisuelle.",
    en: "Visual universe creation and communication materials for an audiovisual production agency.",
  },
  "sn.intro.desc": {
    fr: "SNATSH est une agence de production audiovisuelle spécialisée dans la création de contenus photo et vidéo. Le projet consistait à construire son univers visuel et à le décliner sur différents supports de communication, afin de présenter clairement son positionnement, ses services et sa manière d'accompagner ses clients.",
    en: "SNATSH is an audiovisual production agency specializing in photo and video content creation. The project involved building its visual universe and adapting it across various communication materials, to clearly present its positioning, services, and client support approach.",
  },
  "sn.context.label": { fr: "Contexte", en: "Context" },
  "sn.context.text": {
    fr: "L'enjeu était de donner à SNATSH une présence visuelle identifiable, capable de présenter l'agence de manière claire et crédible. Il fallait construire un univers graphique suffisamment souple pour s'adapter à différents supports tout en conservant une cohérence d'ensemble.",
    en: "The challenge was to give SNATSH an identifiable visual presence, capable of presenting the agency clearly and credibly. It required building a graphic universe flexible enough to adapt to different formats while maintaining overall coherence.",
  },
  "sn.direction.label": { fr: "Direction visuelle", en: "Visual Direction" },
  "sn.direction.text": {
    fr: "L'identité a été pensée pour traduire une image à la fois professionnelle, lisible et contemporaine. Le travail s'est appuyé sur une mise en page éditoriale structurée, une hiérarchie claire de l'information et un traitement visuel cohérent permettant de valoriser l'offre de l'agence sans alourdir la lecture.",
    en: "The identity was designed to convey a professional, readable, and contemporary image. The work relied on a structured editorial layout, clear information hierarchy, and a coherent visual treatment to showcase the agency's offerings without overwhelming the reader.",
  },
  "sn.choices.label": { fr: "Choix graphiques", en: "Graphic Choices" },
  "sn.choices.text": {
    fr: "Le projet repose sur une composition sobre et maîtrisée, pensée pour mettre en avant les contenus, les services et le discours de marque. La structure éditoriale permet d'organiser l'information de manière fluide, tandis que les choix typographiques et la mise en page renforcent la lisibilité, le sérieux et la dimension professionnelle de l'agence.",
    en: "The project relies on a sober and controlled composition, designed to highlight content, services, and brand messaging. The editorial structure organizes information fluidly, while typographic choices and layout reinforce readability, seriousness, and the agency's professional dimension.",
  },
  "sn.palette.label": { fr: "Palette chromatique", en: "Color Palette" },
  "sn.palette.text": {
    fr: "La palette a été pensée dans une logique de clarté et d'efficacité.",
    en: "The palette was designed with a focus on clarity and efficiency.",
  },
  "sn.palette.role.label": { fr: "Rôle des couleurs", en: "Role of Colors" },
  "sn.palette.role.text": {
    fr: "Les contrastes servent à hiérarchiser l'information, structurer les niveaux de lecture et donner du rythme aux supports.",
    en: "Contrasts serve to hierarchize information, structure reading levels, and give rhythm to the materials.",
  },
  "sn.palette.meaning.label": { fr: "Signification", en: "Meaning" },
  "sn.palette.meaning.text": {
    fr: "Le traitement chromatique soutient l'image d'une agence contemporaine, accessible et professionnelle, tout en renforçant la lisibilité et la cohérence de l'ensemble.",
    en: "The chromatic treatment supports the image of a contemporary, accessible, and professional agency, while reinforcing the readability and coherence of the whole.",
  },
  "sn.typo.label": { fr: "Typographie", en: "Typography" },
  "sn.typo.jakarta.desc": {
    fr: "Plus Jakarta Sans est une police géométrique moderne qui allie précision et chaleur. Son tracé ouvert et ses terminaisons nettes apportent un équilibre entre sérieux professionnel et accessibilité contemporaine — idéale pour les titres et éléments structurants.",
    en: "Plus Jakarta Sans is a modern geometric typeface that combines precision and warmth. Its open tracing and clean endings bring a balance between professional seriousness and contemporary accessibility — ideal for headings and structural elements.",
  },
  "sn.typo.roboto.desc": {
    fr: "Roboto offre une lecture fluide grâce à ses proportions mécaniques ouvertes. Sa neutralité et sa clarté en font le complément parfait pour le contenu éditorial, les descriptions et les textes courants.",
    en: "Roboto offers fluid reading thanks to its open mechanical proportions. Its neutrality and clarity make it the perfect complement for editorial content, descriptions, and body text.",
  },
  "sn.logo.label": { fr: "Logo", en: "Logo" },
  "sn.supports.label": { fr: "Supports de communication", en: "Communication Materials" },
  "sn.supports.text": {
    fr: "Déclinaison de l'identité sur des supports éditoriaux : brochures, présentations et documents institutionnels conçus pour refléter le positionnement de l'agence.",
    en: "Identity adaptation across editorial materials: brochures, presentations, and institutional documents designed to reflect the agency's positioning.",
  },
  "sn.mockups.label": { fr: "Mises en situation", en: "Mockups" },
  "sn.mockups.text": {
    fr: "Visualisation des supports dans un contexte réel pour évaluer l'impact visuel et la cohérence de l'identité en situation d'usage.",
    en: "Visualization of materials in a real context to assess visual impact and identity coherence in usage situations.",
  },
  "sn.final.label": { fr: "Merci", en: "Thank You" },
  "sn.final.text": {
    fr: "SNATSH est un projet d'identité visuelle pensé pour donner à une agence de production audiovisuelle une présence claire, crédible et cohérente à travers l'ensemble de ses supports.",
    en: "SNATSH is a visual identity project designed to give an audiovisual production agency a clear, credible, and coherent presence across all its materials.",
  },
  "sn.back": { fr: "Retour aux projets", en: "Back to projects" },
  "sn.book.hint": { fr: "Cliquez pour feuilleter", en: "Click to browse" },
  "proj.sn.desc": {
    fr: "Identité visuelle et supports de communication pour une agence de production audiovisuelle : logo, palette, typographie, brochures.",
    en: "Visual identity and communication materials for an audiovisual production agency: logo, palette, typography, brochures.",
  },
  "tag.audiovisual": { fr: "Audiovisuel", en: "Audiovisual" },

  // ── ARTE en scène ──
  "arte.hero.label": { fr: "Affiches — Spectacle vivant", en: "Posters — Live Performance" },
  "arte.hero.year": { fr: "2025", en: "2025" },
  "arte.intro.tag": { fr: "Spectacle Vivant & Affiches", en: "Live Performance & Posters" },
  "arte.intro.subtitle": {
    fr: "Création de deux propositions de triptyques d'affiches pour le spectacle vivant.",
    en: "Creation of two poster triptych proposals for live performance.",
  },
  "arte.intro.desc": {
    fr: "Ce projet consistait à créer deux triptyques de trois affiches à partir d'une œuvre choisie dans la programmation ARTE en scène. L'objectif était de traduire visuellement le spectacle vivant à travers le mouvement, l'émotion, l'énergie et la présence scénique, tout en proposant deux réponses graphiques différentes à une même consigne.",
    en: "This project involved creating two triptychs of three posters based on a work chosen from the ARTE en scène program. The goal was to visually translate live performance through movement, emotion, energy, and stage presence, while proposing two different graphic responses to the same brief.",
  },
  "arte.context.label": { fr: "Contexte", en: "Context" },
  "arte.context.text": {
    fr: "Le projet s'inscrit dans la programmation ARTE en scène, qui met en avant le spectacle vivant sous toutes ses formes. Il s'agissait de proposer deux interprétations visuelles distinctes d'une même œuvre, chacune explorant une approche graphique différente pour traduire le mouvement et l'énergie de la scène.",
    en: "The project is part of the ARTE en scène program, which highlights live performance in all its forms. The task was to propose two distinct visual interpretations of the same work, each exploring a different graphic approach to translate the movement and energy of the stage.",
  },
  "arte.prop1.label": { fr: "Proposition 1", en: "Proposal 1" },
  "arte.prop1.text": {
    fr: "La première proposition repose sur une composition où la typographie prend une place centrale. Les lettres structurent l'affiche et participent directement à son impact visuel. Associée à des tons roses et magenta sur fond sombre, cette piste développe une lecture plus directe et plus construite du spectacle vivant.",
    en: "The first proposal relies on a composition where typography takes center stage. The letters structure the poster and directly contribute to its visual impact. Combined with pink and magenta tones on a dark background, this approach develops a more direct and structured reading of live performance.",
  },
  "arte.prop1.direction.label": { fr: "Direction visuelle", en: "Visual Direction" },
  "arte.prop1.direction.text": {
    fr: "Cette proposition met l'accent sur la composition, l'échelle typographique et la lisibilité. Le texte devient un élément graphique à part entière, qui organise l'espace et donne du rythme à l'affiche.",
    en: "This proposal emphasizes composition, typographic scale, and readability. The text becomes a graphic element in its own right, organizing space and giving rhythm to the poster.",
  },
  "arte.prop1.choices.label": { fr: "Choix graphiques", en: "Graphic Choices" },
  "arte.prop1.choices.text": {
    fr: "Le choix d'une typographie très présente permet de créer une affiche forte dès le premier regard. Les jeux de lumière et les dégradés prolongent cette intention en donnant plus de profondeur à l'ensemble. Cette piste traduit le spectacle vivant par une approche plus graphique et plus structurée.",
    en: "The choice of a very prominent typography creates a strong poster at first glance. Light play and gradients extend this intention by adding more depth to the whole. This approach translates live performance through a more graphic and structured method.",
  },
  "arte.prop2.label": { fr: "Proposition 2", en: "Proposal 2" },
  "arte.prop2.text": {
    fr: "La seconde proposition adopte une approche plus floue et plus sensible. Le mouvement y est suggéré par l'étirement de l'image, la lumière et le grain. Le corps apparaît davantage comme une trace que comme une figure figée.",
    en: "The second proposal adopts a softer, more sensitive approach. Movement is suggested through image stretching, light, and grain. The body appears more as a trace than a frozen figure.",
  },
  "arte.prop2.direction.label": { fr: "Direction visuelle", en: "Visual Direction" },
  "arte.prop2.direction.text": {
    fr: "Cette piste cherche à rendre le mouvement plus perceptible que descriptif. L'image prend ici une place plus importante que la structure typographique, avec une lecture plus douce et plus atmosphérique.",
    en: "This approach seeks to make movement more perceptible than descriptive. The image takes a more prominent place than the typographic structure, with a softer and more atmospheric reading.",
  },
  "arte.prop2.choices.label": { fr: "Choix graphiques", en: "Graphic Choices" },
  "arte.prop2.choices.text": {
    fr: "Le flou et la lumière permettent de suggérer le déplacement, l'élan et la fragilité du geste. Les teintes violettes et bleutées installent une ambiance plus calme, tout en gardant une vraie présence visuelle. Cette proposition traduit le spectacle vivant de manière plus sensorielle.",
    en: "Blur and light suggest displacement, momentum, and the fragility of gesture. Violet and blue hues establish a calmer atmosphere while maintaining a real visual presence. This proposal translates live performance in a more sensory way.",
  },
  "arte.enjeu.label": { fr: "Enjeu du projet", en: "Project Challenge" },
  "arte.enjeu.text": {
    fr: "L'enjeu était de proposer deux interprétations visuelles cohérentes d'un même sujet, sans rester dans une approche illustrative. La première proposition travaille davantage l'impact graphique et la structure, tandis que la seconde met l'accent sur la sensation et le mouvement.",
    en: "The challenge was to propose two coherent visual interpretations of the same subject without remaining in an illustrative approach. The first proposal focuses more on graphic impact and structure, while the second emphasizes sensation and movement.",
  },
  "arte.palette.label": { fr: "Palette de couleurs", en: "Color Palette" },
  "arte.final.label": { fr: "Merci", en: "Thank You" },
  "arte.final.text": {
    fr: "ARTE en scène est un projet de création d'affiches qui explore deux langages visuels distincts pour traduire l'énergie du spectacle vivant — entre impact typographique et sensorialité du mouvement.",
    en: "ARTE en scène is a poster creation project that explores two distinct visual languages to translate the energy of live performance — between typographic impact and the sensory quality of movement.",
  },
  "arte.back": { fr: "Retour aux projets", en: "Back to projects" },
  "proj.arte.desc": {
    fr: "Deux triptyques d'affiches pour le spectacle vivant : approche typographique et approche sensorielle, réalisés dans le cadre de la programmation ARTE en scène.",
    en: "Two poster triptychs for live performance: typographic approach and sensory approach, created as part of the ARTE en scène program.",
  },
  "tag.poster": { fr: "Affiche", en: "Poster" },
  "tag.livePerformance": { fr: "Spectacle vivant", en: "Live Performance" },

  // ── DC — Digital Campus ──
  "dc.hero.label": { fr: "Communication visuelle", en: "Visual Communication" },
  "dc.hero.year": { fr: "2022 — 2024", en: "2022 — 2024" },
  "dc.intro.tag": { fr: "Communication & Graphisme", en: "Communication & Graphic Design" },
  "dc.intro.subtitle": {
    fr: "Production de supports de communication, print, signalétique, événementiels, digitaux et déclinaison d'univers visuels pour Digital Campus.",
    en: "Production of communication materials, print, signage, events, digital visuals, and visual identity adaptations for Digital Campus.",
  },
  "dc.intro.desc": {
    fr: "Dans le cadre de mon expérience chez Digital Campus, j'ai travaillé sur un ensemble très large de productions visuelles destinées à l'école, à ses événements, à ses prises de parole et à ses différents besoins de communication. Ce travail recouvrait des supports très variés, allant de la signalétique aux supports print, en passant par des visuels digitaux, des éléments événementiels, des contenus étudiants, ainsi que d'autres productions graphiques conçues selon les contextes et les demandes.",
    en: "During my experience at Digital Campus, I worked on a very broad range of visual productions for the school, its events, its communications, and its various needs. This work covered highly diverse formats, from signage to print materials, digital visuals, event elements, student content, and other graphic productions designed according to contexts and requests.",
  },
  "dc.context.label": { fr: "Cadre du projet", en: "Project Context" },
  "dc.context.text": {
    fr: "Le travail s'inscrivait principalement dans l'identité visuelle existante de l'école, avec le respect de ses codes graphiques, de sa charte et de ses principes de mise en page. L'objectif était de garantir une cohérence globale entre des productions nombreuses et de natures différentes, tout en maintenant une communication claire, lisible et identifiable.",
    en: "The work was primarily embedded within the school's existing visual identity, respecting its graphic codes, style guide, and layout principles. The goal was to ensure overall coherence across numerous and varied productions while maintaining clear, readable, and identifiable communication.",
  },
  "dc.particular.label": { fr: "Particularité du projet", en: "Project Specificity" },
  "dc.particular.text": {
    fr: "Selon les besoins, certains supports pouvaient toutefois s'éloigner de la direction artistique initiale. Certaines demandes nécessitaient une réponse visuelle plus spécifique, plus contextuelle ou plus libre.",
    en: "Depending on needs, some materials could depart from the initial art direction. Certain requests required a more specific, contextual, or freer visual response.",
  },
  "dc.challenge.label": { fr: "Enjeu du projet", en: "Project Challenge" },
  "dc.challenge.text": {
    fr: "L'enjeu principal était de faire vivre une identité visuelle sur un volume important de productions, tout en restant capable de l'adapter selon les usages, les formats et les attentes.",
    en: "The main challenge was to bring a visual identity to life across a large volume of productions while being able to adapt it according to uses, formats, and expectations.",
  },
  "dc.approach.label": { fr: "Approche graphique", en: "Graphic Approach" },
  "dc.approach.text": {
    fr: "Mon travail consistait à décliner, adapter et produire des visuels cohérents dans un cadre de marque existant, tout en ajustant la réponse graphique selon les contextes.",
    en: "My work consisted of adapting and producing coherent visuals within an existing brand framework, while adjusting the graphic response according to contexts.",
  },
  "dc.system.label": { fr: "Système visuel", en: "Visual System" },
  "dc.signage.label": { fr: "Signalétique", en: "Signage" },
  "dc.signage.text": {
    fr: "Refonte complète de la signalétique de l'école : signalétique d'entrée à chaque étage, plans d'étage et signalétique de l'ascenseur.",
    en: "Complete redesign of the school's signage: entrance signage on each floor, floor plans, and elevator signage.",
  },
  "dc.cards.label": { fr: "Cartes étudiantes", en: "Student Cards" },
  "dc.screens.label": { fr: "Visuels écrans", en: "Screen Visuals" },
  "dc.posters.label": { fr: "Affiches", en: "Posters" },
  "dc.digital.label": { fr: "Communication digitale", en: "Digital Communication" },
  "dc.digital.text": {
    fr: "Bannières web, signatures mail, campagnes réseaux sociaux et posts à destination des élèves.",
    en: "Web banners, email signatures, social media campaigns, and student-facing posts.",
  },
  "dc.flyer.label": { fr: "Flyer journées d'immersion", en: "Immersion Days Flyer" },
  "dc.studies.label": { fr: "Parcours d'études & Timeline", en: "Study Path & Timeline" },
  "dc.fair.label": { fr: "Pack salons étudiants", en: "Student Fair Pack" },
  "dc.fair.text": {
    fr: "Kakémonos, flyers et visuels pour les stands de salons de l'étudiant.",
    en: "Kakemonos, flyers, and visuals for student fair booths.",
  },
  "dc.print.label": { fr: "Documents Print", en: "Print Documents" },
  "dc.print.text": {
    fr: "Brochures, plaquettes et livrets conçus dans le cadre de la communication de l'école.",
    en: "Brochures, booklets, and guides designed as part of the school's communication.",
  },
  "dc.back": { fr: "Retour aux projets", en: "Back to projects" },
  "proj.dc.desc": {
    fr: "Production complète de supports visuels pour Digital Campus : signalétique, print, digital, événementiels et déclinaisons graphiques.",
    en: "Complete production of visual materials for Digital Campus: signage, print, digital, events, and graphic adaptations.",
  },
  "tag.communication": { fr: "Communication", en: "Communication" },
  "tag.print": { fr: "Print", en: "Print" },
  "tag.brandContent": { fr: "Brand Content", en: "Brand Content" },
  "tag.communityMgmt": { fr: "Community Management", en: "Community Management" },
  "tag.video": { fr: "Vidéo", en: "Video" },
  "proj.nrtv.desc": {
    fr: "Déploiement d'une nouvelle direction artistique et production de contenus pour un établissement d'enseignement supérieur.",
    en: "Deployment of a new artistic direction and content production for a higher education institution.",
  },
  // ── Radio Libre ──
  "rl.back": { fr: "Retour aux projets", en: "Back to projects" },
  "proj.rl.desc": {
    fr: "Création d'identité visuelle en sprint créatif pour une radio indépendante à la programmation jeune, musicale et divertissante.",
    en: "Visual identity creation in a creative sprint for an independent radio station with young, musical and entertaining programming.",
  },
  "tag.radioIdentity": { fr: "Identité Radio", en: "Radio Identity" },
  "tag.sprint": { fr: "Sprint Créatif", en: "Creative Sprint" },
} as const;

export type TranslationKey = keyof typeof translations;

interface I18nContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("site-lang") as Lang | null;
      if (saved === "fr" || saved === "en") return saved;
      // Detect browser language
      const browserLang = navigator.language.slice(0, 2);
      return browserLang === "fr" ? "fr" : "en";
    }
    return "fr";
  });

  const handleSetLang = useCallback((newLang: Lang) => {
    setLang(newLang);
    localStorage.setItem("site-lang", newLang);
  }, []);

  const t = useCallback(
    (key: TranslationKey): string => {
      const entry = translations[key];
      return entry ? entry[lang] : key;
    },
    [lang]
  );

  return (
    <I18nContext.Provider value={{ lang, setLang: handleSetLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
