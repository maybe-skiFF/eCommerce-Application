import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { CategoryChoiceSubProps } from 'src/utils/interfaces';

export function CategoryChoiceSub({
  isVisible,
  selectedKey,
  handleChangeProp,
}: CategoryChoiceSubProps) {
  const categories = [
    {
      key: 'for-kids',
      subcategories: [
        { id: 'a89e12d1-c111-4d0b-a936-d91bae787c83', key: 'cloth' },
        { id: '243f704c-009e-472a-aca6-4bcf66ea5475', key: 'toys' },
      ],
    },
    {
      key: 'for-men',
      subcategories: [
        { id: 'b04d2872-18da-4f58-9ecc-6880a2702877', key: 'shirts' },
        { id: 'ec2386d9-9ec1-4c70-b919-0136cb987e3e', key: 'shorts' },
        { id: '6069c785-a373-427f-ab70-730dce03bec6', key: 'boots' },
      ],
    },
    {
      key: 'for-women',
      subcategories: [
        { id: '92a4b7a0-4021-4357-b077-c5ce4cc2adbb', key: 'dresses' },
        { id: '1722470f-e813-4434-aedc-a1e54c45e050', key: 'skirts' },
        { id: 'dd6d5b76-300e-434a-813f-9f4348e5e09e', key: 'shoes' },
      ],
    },
    {
      key: 'discount',
      subcategories: [],
    },
  ];

  const selectedCategory = categories.find(
    category => category.key === selectedKey,
  );

  return (
    <ToggleButtonGroup
      sx={{
        marginTop: '20px',
        width: '100%',
        height: '50px',
        display: 'flex',
        visibility: isVisible ? 'visible' : 'hidden',
        justifyContent: 'center',
      }}
      exclusive
      onChange={handleChangeProp}
      aria-label="Platform"
    >
      {selectedCategory?.subcategories.map(subcategory => (
        <ToggleButton
          key={subcategory.key}
          value={subcategory.key}
          data-id={subcategory.id ?? ''}
          sx={{
            width: '200px',
            height: '50px',
          }}
        >
          {subcategory.key}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
