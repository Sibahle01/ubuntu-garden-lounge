import { Section, Heading, Text, Hr } from '@react-email/components';

export const EmailHeader = () => (
  <Section style={headerContainer}>
    <Heading style={title}>🌍 UBUNTU GARDEN LOUNGE</Heading>
    <Text style={subtitle}>Modern African Dining Experience</Text>
    <Hr style={divider} />
  </Section>
);

const headerContainer = {
  textAlign: 'center' as const,
  padding: '20px 0',
  backgroundColor: '#1a472a',
  borderRadius: '8px 8px 0 0',
};

const title = {
  color: '#d4af37',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0',
  letterSpacing: '2px',
};

const subtitle = {
  color: '#f0e6d2',
  fontSize: '14px',
  margin: '8px 0 0 0',
};

const divider = {
  borderColor: '#d4af37',
  marginTop: '16px',
};