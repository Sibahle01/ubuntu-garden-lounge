import {
  Container,
  Section,
  Text,
  Heading,
  Row,
  Column,
  Button,
} from '@react-email/components';
import { EmailHeader } from './components/EmailHeader';
import { EmailFooter } from './components/EmailFooter';

interface OrderConfirmationProps {
  customerName: string;
  orderNumber: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  subtotal: number;
  tax: number;
  total: number;
  orderType: 'dine-in' | 'pickup';
  specialRequests?: string;
}

export const OrderConfirmation = ({
  customerName,
  orderNumber,
  items,
  subtotal,
  tax,
  total,
  orderType,
  specialRequests,
}: OrderConfirmationProps) => (
  <Container style={container}>
    <EmailHeader />
    
    <Section style={content}>
      <Heading style={greeting}>Thank you, {customerName}! 🎉</Heading>
      <Text style={message}>
        Your order has been received and is being prepared.
      </Text>
      
      <Section style={orderBox}>
        <Text style={orderNumberText}>ORDER #{orderNumber}</Text>
        <Text style={orderTypeText}>
          {orderType === 'pickup' ? '📦 Takeaway' : '🍽️ Dine-in'}
        </Text>
      </Section>

      <Heading style={sectionTitle}>ORDER SUMMARY</Heading>
      <Section style={itemsTable}>
        {items.map((item, index) => (
          <Row key={index} style={itemRow}>
            <Column style={itemName}>
              {item.quantity}x {item.name}
            </Column>
            <Column style={itemPrice}>
              R{(item.price * item.quantity).toFixed(2)}
            </Column>
          </Row>
        ))}
        
        <Row style={dividerRow}>
          <Column colSpan={2}>
            <div style={itemDivider} />
          </Column>
        </Row>
        
        <Row style={totalRow}>
          <Column style={totalLabel}>Subtotal</Column>
          <Column style={totalAmount}>R{subtotal.toFixed(2)}</Column>
        </Row>
        <Row style={totalRow}>
          <Column style={totalLabel}>Tax (15%)</Column>
          <Column style={totalAmount}>R{tax.toFixed(2)}</Column>
        </Row>
        <Row style={grandTotalRow}>
          <Column style={grandTotalLabel}>TOTAL</Column>
          <Column style={grandTotalAmount}>R{total.toFixed(2)}</Column>
        </Row>
      </Section>

      {specialRequests && (
        <Section style={specialRequestsBox}>
          <Text style={specialRequestsLabel}>📝 Special Requests:</Text>
          <Text style={specialRequestsText}>"{specialRequests}"</Text>
        </Section>
      )}

      <Section style={infoBox}>
        <Text style={infoTitle}>📍 Pickup Information</Text>
        <Text style={infoText}>
          <strong>Location:</strong> Ubuntu Garden Lounge<br />
          <strong>Estimated Time:</strong> 20-30 minutes<br />
          <strong>Questions?</strong> Call us at (555) 123-4567
        </Text>
      </Section>

      <Button href="#" style={button}>
        View Order Status →
      </Button>
    </Section>

    <EmailFooter />
  </Container>
);

// Styles
const container = {
  backgroundColor: '#f0e6d2',
  borderRadius: '8px',
  fontFamily: 'Arial, sans-serif',
};

const content = {
  padding: '32px',
  backgroundColor: '#ffffff',
};

const greeting = {
  color: '#1a472a',
  fontSize: '24px',
  margin: '0 0 8px 0',
};

const message = {
  color: '#333',
  fontSize: '16px',
  margin: '0 0 24px 0',
};

const orderBox = {
  backgroundColor: '#f0e6d2',
  padding: '16px',
  borderRadius: '8px',
  marginBottom: '32px',
  textAlign: 'center' as const,
};

const orderNumberText = {
  color: '#1a472a',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0',
};

const orderTypeText = {
  color: '#666',
  fontSize: '14px',
  margin: '8px 0 0 0',
};

const sectionTitle = {
  color: '#1a472a',
  fontSize: '18px',
  margin: '0 0 16px 0',
  borderBottom: '2px solid #d4af37',
  paddingBottom: '8px',
};

const itemsTable = {
  marginBottom: '24px',
};

const itemRow = {
  marginBottom: '8px',
};

const itemName = {
  fontSize: '14px',
  color: '#333',
};

const itemPrice = {
  fontSize: '14px',
  color: '#333',
  textAlign: 'right' as const,
};

const dividerRow = {
  marginTop: '12px',
  marginBottom: '12px',
};

const itemDivider = {
  borderTop: '1px solid #ddd',
};

const totalRow = {
  marginBottom: '8px',
};

const totalLabel = {
  fontSize: '14px',
  color: '#666',
};

const totalAmount = {
  fontSize: '14px',
  color: '#666',
  textAlign: 'right' as const,
};

const grandTotalRow = {
  marginTop: '12px',
};

const grandTotalLabel = {
  fontSize: '16px',
  fontWeight: 'bold',
  color: '#1a472a',
};

const grandTotalAmount = {
  fontSize: '16px',
  fontWeight: 'bold',
  color: '#d4af37',
  textAlign: 'right' as const,
};

const specialRequestsBox = {
  backgroundColor: '#f9f6f0',
  padding: '16px',
  borderRadius: '8px',
  marginBottom: '24px',
};

const specialRequestsLabel = {
  fontSize: '12px',
  color: '#666',
  margin: '0 0 4px 0',
};

const specialRequestsText = {
  fontSize: '14px',
  color: '#333',
  fontStyle: 'italic',
  margin: '0',
};

const infoBox = {
  backgroundColor: '#f0e6d2',
  padding: '16px',
  borderRadius: '8px',
  marginBottom: '24px',
};

const infoTitle = {
  fontSize: '14px',
  fontWeight: 'bold',
  color: '#1a472a',
  margin: '0 0 8px 0',
};

const infoText = {
  fontSize: '12px',
  color: '#333',
  margin: '0',
  lineHeight: '1.6',
};

const button = {
  backgroundColor: '#1a472a',
  color: '#ffffff',
  padding: '12px 24px',
  borderRadius: '8px',
  textAlign: 'center' as const,
  textDecoration: 'none',
  display: 'inline-block',
};