---
next: /dev/retool/
---

# Styling

## Changing/Adding Icons

If the new image/icon source is a vector graphic, it should be imported into the project as `SVG` (see code below). Otherwise, images should be converted to `WebP`, added to `src/public/images`, and accessed in your component. See the react documentation on [adding images](https://create-react-app.dev/docs/adding-images-fonts-and-files/) for more information.

**Adding a new SVG icon**

1. Add a new icon in `src/lib/icons.tsx` as below

```ts:no-line-numbers
export const IconSvgs = {
    newIcon: (
        // svg icon
    ),

    // other svg icons
}
```

2. Access the icon in the component, referenced by the type attribute

```tsx:no-line-numbers
import Icon from '@/components/Icon';
// ...
const newIcon = <Icon type="newIcon" />
```
