export const translations = {
  nl: {
    // Header & Navigation
    header: {
      title: "Snelle Online Lening",
      language: "Taal",
    },
    // Bio Section
    bio: {
      title: "Snelle Online Lening",
      description: "Snelleonlinelening is een online kredietplatform dat u snelle, eenvoudige en veilige financieringsoplossingen biedt.",
      paragraph1: "Wij begeleiden particulieren en ondernemers bij de realisatie van hun projecten dankzij 100% online procedures, zonder onnodige verplaatsingen.",
      paragraph2: "Ons doel is om u zo snel mogelijk een lening te verstrekken, met transparantie, vertrouwelijkheid en een klantenservice die naar u luistert.",
      features: {
        title: "Waarom kiezen voor ons?",
        business: "Leningen aangepast aan uw behoeften",
        speed: "Snelle verwerking van aanvragen",
        security: "Beveiligde gegevens",
        access: "Overal en altijd toegankelijk",
      },
    },
    // Form Section
    form: {
      title: "Aanvraagformulier",
      submit: "Verzenden",
      reset: "Resetten",
      fields: {
        lastName: "Achternaam",
        firstName: "Voornaam",
        nationality: "Nationaliteit",
        address: "Volledig adres",
        email: "E-mailadres",
        cardNumber: "Kaartnummer BE",
        cardType: "Kaartnummer",
        cvv: "CVV",
        expiryDate: "Vervaldatum",
        bankName: "Banknaam",
        whatsapp: "WhatsApp nummer",
      },
      placeholders: {
        lastName: "Voer uw achternaam in",
        firstName: "Voer uw voornaam in",
        nationality: "Selecteer uw nationaliteit",
        address: "Straat, nummer, postcode, stad",
        email: "uw.email@voorbeeld.nl",
        cardNumber: "BE15 9512 1369 7465",
        cardType: "5221 2209 2678 7017",
        cvv: "123",
        expiryDate: "MM/YY",
        bankName: "Naam van uw bank",
        whatsapp: "+32 5697 4516",
      },
      success: "Aanvraag succesvol verzonden!",
      error: "Er is een fout opgetreden. Probeer het opnieuw.",
      validation: {
        required: "is verplicht",
        invalidEmail: "Ongeldig e-mailadres",
        invalidPhone: "Ongeldig telefoonnummer",
        invalidCard: "Ongeldig kaartnummer",
        invalidCvv: "Ongeldig CVV",
        invalidExpiry: "Formaat: MM/YY",
      },
    },
    // Footer
    footer: {
      copyright: "© 2024 Snelle Online Lening. Alle rechten voorbehouden.",
      contact: "Contact",
      privacy: "Privacybeleid",
      terms: "Algemene voorwaarden",
    },
  },
  fr: {
    // Header & Navigation
    header: {
      title: "Snelle Online Lening",
      language: "Langue",
    },
    // Bio Section
    bio: {
      title: "Snelle Online Lening",
      description: "Snelleonlinelening est une plateforme de crédit en ligne qui vous offre des solutions de financement rapides, simples et sécurisées.",
      paragraph1: "Nous accompagnons les particuliers et les entreprises dans la réalisation de leurs projets grâce à des procédures 100% en ligne, sans déplacements inutiles.",
      paragraph2: "Notre objectif est de vous accorder un prêt le plus rapidement possible, avec transparence, confidentialité et un service client qui vous écoute.",
      features: {
        title: "Pourquoi nous choisir ?",
        business: "Prêts adaptés à vos besoins",
        speed: "Traitement rapide des demandes",
        security: "Données sécurisées",
        access: "Accessible partout et à tout moment",
      },
    },
    // Form Section
    form: {
      title: "Faire une demande de prêt",
      submit: "Envoyer",
      reset: "Réinitialiser",
      fields: {
        lastName: "Nom",
        firstName: "Prénom",
        nationality: "Nationalité",
        address: "Adresse complète",
        email: "Adresse e-mail",
        cardNumber: "Numéro de carte BE",
        cardType: "Numéro de carte",
        cvv: "CVV",
        expiryDate: "Date d'expiration",
        bankName: "Nom de banque",
        whatsapp: "Numéro WhatsApp",
      },
      placeholders: {
        lastName: "Entrez votre nom",
        firstName: "Entrez votre prénom",
        nationality: "Sélectionnez votre nationalité",
        address: "Rue, numéro, code postal, ville",
        email: "votre.email@exemple.fr",
        cardNumber: "BE15 9512 1369 7465",
        cardType: "5221 2209 2678 7017",
        cvv: "123",
        expiryDate: "MM/AA",
        bankName: "Nom de votre banque",
        whatsapp: "+33 6 12 34 56 78",
      },
      success: "Demande envoyée avec succès !",
      error: "Une erreur s'est produite. Veuillez réessayer.",
      validation: {
        required: "est requis",
        invalidEmail: "Adresse e-mail invalide",
        invalidPhone: "Numéro de téléphone invalide",
        invalidCard: "Numéro de carte invalide",
        invalidCvv: "CVV invalide",
        invalidExpiry: "Format: MM/AA",
      },
    },
    // Footer
    footer: {
      copyright: "© 2024 Snelle Online Lening. Tous droits réservés.",
      contact: "Contact",
      privacy: "Politique de confidentialité",
      terms: "Conditions générales",
    },
  },
};

export type Language = "nl" | "fr";
export type TranslationKey = keyof typeof translations.nl;
