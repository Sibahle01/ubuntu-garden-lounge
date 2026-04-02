import { Container, Section, Text, Heading, Row, Column, Button } from '@react-email/components';
import { EmailHeader } from './components/EmailHeader';
import { EmailFooter } from './components/EmailFooter';

interface ReservationConfirmationProps {
  customerName: string;
  reservationId: string;
  date: Date;
  time: string;
  guests: number;
  specialRequests?: string;
}

export const ReservationConfirmation = ({
  customerName,
  reservationId,
  date,
  time,
  guests,
  specialRequests,
}: ReservationConfirmationProps) => {
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Container style={container}>
      <EmailHeader />
      
      <Section style={content}>
        <Heading style={greeting}>Dear {customerName},</Heading>
        <Text style={message}>
          Your table has been reserved! We look forward to hosting you.
        </Text>
        
        <Section style={reservationBox}>
          <Text style={reservationIdText}>Reservation #{reservationId.slice(-6)}</Text>
          <Text style={confirmationBadge}>✅ CONFIRMED</Text>
        </Section>

        <Heading style={sectionTitle}>RESERVATION DETAILS</Heading>
        <Section style={detailsTable}>
          <Row style={detailRow}>
            <Column style={detailLabel}>📅 Date</Column>
            <Column style={detailValue}>{formattedDate}</Column>
          </Row>
          <Row style={detailRow}>
            <Column style={detailLabel}>⏰ Time</Column>
            <Column style={detailValue}>{time}</Column>
          </Row>
          <Row style={detailRow}>
            <Column style={detailLabel}>👥 Guests</Column>
            <Column style={detailValue}>{guests} {guests === 1 ? 'person' : 'people'}</Column>
          </Row>
          <Row style={detailRow}>
            <Column style={detailLabel}>📍 Table</Column>
            <Column style={detailValue}>Premium seating (window section)</Column>
          </Row>
        </Section>

        {specialRequests && (
          <Section style={specialRequestsBox}>
            <Text style={specialRequestsLabel}>📝 Special Requests:</Text>
            <Text style={specialRequestsText}>"{specialRequests}"</Text>
            <Text style={specialRequestsNote}>
              We'll do our best to accommodate your request.
            </Text>
          </Section>
        )}

        <Section style={infoBox}>
          <Text style={infoTitle}>✨ Before You Arrive</Text>
          <Text style={infoText}>
            • Free parking available at the back<br />
            • Dress code: Smart casual<br />
            • We hold tables for 15 minutes past reservation time<br />
            • Dietary restrictions? Let us know when you arrive
          </Text>
        </Section>

        <Section style={buttonGroup}>
          <Button href="#" style={buttonPrimary}>
            Add to Calendar →
          </Button>
          <Button href="#" style={buttonSecondary}>
            Modify Reservation
          </Button>
        </Section>
      </Section>

      <EmailFooter />
    </Container>
  );
};

// Styles (similar to OrderConfirmation)
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

const reservationBox = {
  backgroundColor: '#f0e6d2',
  padding: '16px',
  borderRadius: '8px',
  marginBottom: '32px',
  textAlign: 'center' as const,
};

const reservationIdText = {
  color: '#666',
  fontSize: '12px',
  margin: '0 0 4px 0',
};

const confirmationBadge = {
  color: '#1a472a',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0',
};

const sectionTitle = {
  color: '#1a472a',
  fontSize: '18px',
  margin: '0 0 16px 0',
  borderBottom: '2px solid #d4af37',
  paddingBottom: '8px',
};

const detailsTable = {
  marginBottom: '24px',
};

const detailRow = {
  marginBottom: '12px',
};

const detailLabel = {
  fontSize: '14px',
  fontWeight: 'bold',
  color: '#1a472a',
  width: '100px',
};

const detailValue = {
  fontSize: '14px',
  color: '#333',
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
  margin: '0 0 8px 0',
};

const specialRequestsNote = {
  fontSize: '12px',
  color: '#999',
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

const buttonGroup = {
  textAlign: 'center' as const,
};

const buttonPrimary = {
  backgroundColor: '#1a472a',
  color: '#ffffff',
  padding: '12px 24px',
  borderRadius: '8px',
  marginRight: '12px',
  textDecoration: 'none',
  display: 'inline-block',
};

const buttonSecondary = {
  backgroundColor: '#d4af37',
  color: '#1a472a',
  padding: '12px 24px',
  borderRadius: '8px',
  textDecoration: 'none',
  display: 'inline-block',
};