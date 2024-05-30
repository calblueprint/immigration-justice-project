# Miscellaneous 

## Changing/Adding Icons 

- Add a new icon in `src/lib/icons.tsx` as below
```ts
export const IconSvgs = {
    newIcon: (
        // svg icon
    ),
    
    // other svg icons 
}
```
- Access the icon in the component, referenced by the type attribute
```tsx
import Icon from '@/components/Icon';
// ... 
const newIcon = <Icon type="newIcon" />
```