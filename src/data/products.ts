import { Product, Testimonial, ReassuranceMetric } from '../types';

export const PRODUCTS: Product[] = [
  // NOS SAVONS
  {
    id: 'savon-bronze',
    name: 'Savon Teint Bronzé',
    category: 'savon',
    weight: '360g',
    price: 4000,
    description: 'Savon de soin végétal spécialement formulé pour illuminer et unifier les teints bronzés et hâlés sans agresser la peau.',
    image: '/images/teint-bronze.jpeg',
    secondaryImage: '/images/pack-stern.jpeg',
    badge: 'Incontournable',
    skinTypes: ['Teint Bronzé', 'Peaux hâlées', 'Peaux normales à mixtes'],
    ingredients: ['Huile de carotte', 'Curcuma bio', 'Beurre de karité pur', 'Huile de palmiste douce'],
    usage: 'Masser délicatement la mousse sur le corps et le visage matin et soir. Rincer à l\'eau tiède.'
  },
  {
    id: 'savon-caramel',
    name: 'Savon Teint Caramel',
    category: 'savon',
    weight: '250g',
    price: 3500,
    description: 'Nourrit intensément les peaux au teint caramel tout en éliminant doucement les taches et les impuretés.',
    image: '/images/teint-caramel.jpeg',
    secondaryImage: '/images/pack-stern.jpeg',
    badge: 'Coup de cœur',
    skinTypes: ['Teint Caramel', 'Peaux sèches', 'Teint terne'],
    ingredients: ['Miel brut', 'Beurre de cacao', 'Extrait d\'avoine', 'Ozone végétal'],
    usage: 'Appliquer sur peau humide en mouvements circulaires. Laisser poser 2-3 minutes pour un effet masque éclat.'
  },
  {
    id: 'savon-ebene',
    name: 'Savon Teint Ébène',
    category: 'savon',
    weight: '250g',
    price: 3500,
    description: 'Soin lavant velouté qui préserve la richesse du teint ébène, ravive son éclat naturel et affine le grain de peau.',
    image: '/images/teint-ebene.jpeg',
    secondaryImage: '/images/pack-stern.jpeg',
    badge: 'Top Éclat',
    skinTypes: ['Teint Ébène', 'Peaux noires', 'Imperfections légères'],
    ingredients: ['Charbon actif', 'Huile de baobab', 'Extrait de réglisse', 'Provitamine B5'],
    usage: 'Utiliser quotidiennement sous la douche pour préserver l\'hydratation et le velouté satiné de votre peau.'
  },
  {
    id: 'savon-olive',
    name: 'Savon Teint Mat Olive',
    category: 'savon',
    weight: '360g',
    price: 4000,
    description: 'Purifie et régule le sébum des teints mats et olives pour une peau fraîche, unifiée et visiblement plus lumineuse.',
    image: '/images/teint-olive.jpeg',
    secondaryImage: '/images/pack-stern.jpeg',
    badge: 'Équilibrant',
    skinTypes: ['Teint Mat Olive', 'Peaux mixtes à grasses'],
    ingredients: ['Huile d\'olive vierge', 'Argile verte fine', 'Extrait de thé vert', 'Ozonides naturels'],
    usage: 'Faire mousser entre les mains, nettoyer l\'ensemble du corps puis rincer abondamment.'
  },
  {
    id: 'savon-porcelaine-400g',
    name: 'Savon Teint très clair Porcelaine',
    category: 'savon',
    weight: '400g',
    price: 5000,
    description: 'Formule clarifiante ultra-douce pour peaux très claires. Hydrate, lisse et prévient les taches tout en douceur.',
    image: '/images/teint-porcelaine-400g.jpeg',
    secondaryImage: '/images/teint-porcelaine-500g.jpeg',
    badge: 'Gamme Élégance',
    skinTypes: ['Teint très clair Porcelaine', 'Peaux délicates'],
    ingredients: ['Protéines de lait', 'Fleur d\'oranger', 'Beurre de mangue', 'Huile d\'amande douce'],
    usage: 'Idéal en soin quotidien du matin et du soir pour préserver un teint de porcelaine uniforme.'
  },
  {
    id: 'savon-porcelaine-500g',
    name: 'Savon Teint très clair Porcelaine Grand Format',
    category: 'savon',
    weight: '500g',
    price: 6000,
    description: 'Format généreux de 500g pour un soin clarifiant et lissant longue durée. Redonne souplesse et éclat radieux.',
    image: '/images/teint-porcelaine-500g.jpeg',
    secondaryImage: '/images/teint-porcelaine-400g.jpeg',
    badge: 'Format Économique',
    skinTypes: ['Teint très clair Porcelaine', 'Utilisation familiale'],
    ingredients: ['Protéines de lait', 'Géranium rosat', 'Huile d\'amande douce', 'Gel d\'aloe vera'],
    usage: 'Appliquer sur l\'ensemble du corps. Rincer après avoir savouré sa mousse crémeuse aux senteurs fleuries.'
  },

  // CRÈME ET AUTRES
  {
    id: 'creme-sublimatrice',
    name: 'Crème Sublimatrice',
    category: 'creme',
    price: 1500,
    description: 'Formule raffinée pour une touche de lumière et d\'élégance. Pénètre instantanément sans laisser de film gras.',
    image: '/images/creme-sublimatrice.jpeg',
    secondaryImage: '/images/creme-vergeture.jpeg',
    badge: 'Lumière & Éclat',
    skinTypes: ['Visage & Décolleté', 'Toutes peaux'],
    ingredients: ['Micronutriments botaniques', 'Niacinamide (Vitamine B3)', 'Beurre de karité', 'Eaux florales'],
    usage: 'Appliquer une noisette sur le visage propre en effectuant de légers tapotements du centre vers l\'extérieur.'
  },
  {
    id: 'creme-vergeture',
    name: 'Crème vergéture',
    category: 'creme',
    price: 1500,
    description: 'Produit de soin à la texture douce et confortable. Améliore la souplesse de la peau et réduit l\'apparence des stries.',
    image: '/images/creme-vergeture.jpeg',
    secondaryImage: '/images/creme-sublimatrice.jpeg',
    badge: 'Soin Réparateur',
    skinTypes: ['Zones ciblées (Hanches, Ventre, Cuisses)', 'Peaux fragiles'],
    ingredients: ['Huile de rose musquée', 'Beurre de cacao', 'Vitamine E', 'Collagène végétal'],
    usage: 'Masser matin et soir sur les zones sujettes aux vergetures en effectuant des mouvements palper-rouler doux.'
  },
  {
    id: 'gommage-exfoliant',
    name: 'Gommage Corporel',
    category: 'creme',
    price: 1000,
    description: 'Exfoliant délicat pour un teint net et lumineux. Élimine les cellules mortes et prépare la peau aux soins hydratants.',
    image: '/images/gommage.jpeg',
    secondaryImage: '/images/lait-hydratant.jpeg',
    badge: 'Grain Parfait',
    skinTypes: ['Corps entier', 'Toutes peaux'],
    ingredients: ['Poudre de noyau d\'abricot', 'Pépins de fraise', 'Sucre de canne blond', 'Huile de macadamia'],
    usage: '1 à 2 fois par semaine sur peau humide. Frictionner délicatement en insistant sur les coudes et genoux.'
  },
  {
    id: 'lait-hydratant',
    name: 'Lait Hydratant Satiné',
    category: 'creme',
    price: 4000,
    description: 'Hydrate la peau en profondeur et lui redonne tout son éclat satiné naturel tout au long de la journée.',
    image: '/images/lait-hydratant.jpeg',
    secondaryImage: '/images/gommage.jpeg',
    badge: 'Hydratation 24h',
    skinTypes: ['Peaux sèches & déshydratées', 'Usage quotidien'],
    ingredients: ['Lait de coco bio', 'Huile de jojoba', 'Acide hyaluronique végétal', 'Extrait de jasmin'],
    usage: 'Appliquer généreusement sur tout le corps après la douche ou le bain.'
  },

  // PACK STERN
  {
    id: 'pack-stern-special',
    name: 'Pack Spécial Stern',
    category: 'pack',
    price: 13000,
    description: 'La routine beauté premium qui fait la différence. Sélection complète composée du savon de votre choix, de la crème visage offerte, du lait hydratant et du gommage corps.',
    image: '/images/pack-stern.jpeg',
    secondaryImage: '/images/hero-2.jpeg',
    badge: 'Offre Spéciale Exclusive',
    skinTypes: ['Routine Complète', 'Tous types de peaux'],
    ingredients: ['Formules 100% végétales & vegan', 'Riche en vitamines A, C & E', 'Senteurs subtiles de fleur d\'oranger et miel'],
    usage: 'Combinez le savon le matin, le gommage 2x par semaine et le lait hydratant après chaque toilette pour une métamorphose visible.'
  }
];

export const REASSURANCE_METRICS: ReassuranceMetric[] = [
  {
    value: '78%',
    label: 'Clientes fidèles',
    sublabel: 'résultats constatés dès la 1ère semaine'
  },
  {
    value: '24h',
    label: 'Expédition express',
    sublabel: 'livraison soignée & emballage chic'
  },
  {
    value: '100%',
    label: 'Formules vegan',
    sublabel: 'ingrédients naturels & cruelty-free'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Amélie',
    comment: 'Les textures sont sublimes et le rendu naturel est parfait. Ma peau n\'a jamais été aussi douce et lumineuse.',
    rating: 5,
    productName: 'Savon Teint Caramel',
    city: 'Cotonou'
  },
  {
    id: 't-2',
    name: 'Sara',
    comment: 'J\'adore la qualité des produits et l\'expérience de commande. Le Pack Stern est vraiment ultra avantageux !',
    rating: 5,
    productName: 'Pack Spécial Stern',
    city: 'Porto-Novo'
  },
  {
    id: 't-3',
    name: 'Leïa',
    comment: 'Un vrai coup de cœur pour les packs de soin et le packaging très chic. Je recommande les yeux fermés !',
    rating: 5,
    productName: 'Crème Sublimatrice & Gommage',
    city: 'Parakou'
  }
];
