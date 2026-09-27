import { CardDialog } from '@/components/card-dialog';

// ⓘ next to "Enrich this contact?": what enrichment does.
export function EnrichDialog({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  return (
    <CardDialog
      visible={visible}
      title="Enrich contact"
      body="Groowid AI uses the details you provide to find additional contact information like a profile photo, job title, company, website, or phone number. Providing a full name, email or business name helps improve accuracy."
      actions={[{ label: 'Got it', onPress: onClose, accent: true }]}
      onRequestClose={onClose}
    />
  );
}
