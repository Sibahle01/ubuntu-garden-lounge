import { Section, Text, Hr, Link } from '@react-email/components';

export const EmailFooter = () => (
  <Section style={footerContainer}>
    <Hr style={divider} />
    <Text style={footerText}>
      📍 Ubuntu Garden Lounge<br />
      📞 (555) 123-4567<br />
      ✉️ hello@ubuntugarden.demo
    </Text>
    <Text style={demoDisclaimer}>
      🧾 This is a demo receipt from a portfolio project.<br />
      No actual payment has been processed.
    </Text>
    <Text style={footerSmall}>
      © 2025 Ubuntu Garden Lounge • Demo System
    </Text>
  </Section>
);

const footerContainer = {
  padding: '20px',
  backgroundColor: '#f9f6f0',
  borderRadius: '0 0 8px 8px',
};

const divider = {
  borderColor: '#d4af37',
  marginBottom: '16px',
};

const footerText = {
  fontSize: '12px',
  color: '#666',
  textAlign: 'center' as const,
  lineHeight: '1.6',
};

const demoDisclaimer = {
  fontSize: '11px',
  color: '#999',
  textAlign: 'center' as const,
  marginTop: '16px',
  fontStyle: 'italic',
};

const footerSmall = {
  fontSize: '10px',
  color: '#aaa',
  textAlign: 'center' as const,
  marginTop: '16px',
};