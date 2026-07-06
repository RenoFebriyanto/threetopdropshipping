---
name: Lumina
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#4c4546'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f1f1f1'
  outline: '#7e7576'
  outline-variant: '#cfc4c5'
  surface-tint: '#5e5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1b1b1b'
  on-primary-container: '#848484'
  inverse-primary: '#c6c6c6'
  secondary: '#5e5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e1dfdf'
  on-secondary-container: '#626263'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1a1c1c'
  on-tertiary-container: '#838484'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c6'
  on-primary-fixed: '#1b1b1b'
  on-primary-fixed-variant: '#474747'
  secondary-fixed: '#e4e2e2'
  secondary-fixed-dim: '#c7c6c6'
  on-secondary-fixed: '#1b1c1c'
  on-secondary-fixed-variant: '#464747'
  tertiary-fixed: '#e3e2e2'
  tertiary-fixed-dim: '#c7c6c6'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#464747'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  display-lg:
    fontFamily: Bodoni Moda
    fontSize: 64px
    fontWeight: '400'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Bodoni Moda
    fontSize: 40px
    fontWeight: '400'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Bodoni Moda
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.3'
  headline-md:
    fontFamily: Bodoni Moda
    fontSize: 24px
    fontWeight: '400'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '300'
    lineHeight: '1.6'
    letterSpacing: 0.01em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.1em
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 24px
  margin-desktop: 80px
  margin-tablet: 40px
  margin-mobile: 20px
  stack-xl: 120px
  stack-lg: 80px
  stack-md: 48px
---

## Brand & Style

The design system is anchored in **High-End Minimalism**, evoking the atmosphere of a luxury boutique where the product is the sole focus. It targets a discerning audience that values quiet luxury, architectural precision, and editorial sophistication.

The visual language blends **Modern Minimalism** with subtle **Glassmorphism**. It relies on expansive whitespace to create a sense of "breathing room," allowing high-resolution photography to serve as the primary texture. The emotional response should be one of calm, exclusivity, and timelessness. Interactions are deliberate and understated, avoiding unnecessary ornamentation in favor of structural clarity.

## Colors

The palette is strictly monochromatic with warm undertones to prevent the interface from feeling sterile. 

- **Primary (#000000):** Used for core typography, primary actions, and structural borders. It represents authority and timeless elegance.
- **Secondary (#707070):** Used for secondary text and icons, providing a soft contrast against the stark black.
- **Neutral (#F9F9F9):** The primary background color for container elements and sections, creating a subtle layer of depth against the pure white (#FFFFFF) page background.
- **Accent/Warm Grey:** Used for hover states and disabled UI elements to maintain the tonal harmony.

## Typography

Typography is the cornerstone of this design system. It uses a high-contrast serif, **Bodoni Moda**, for all editorial moments and headlines to signal luxury. This is balanced by **Inter**, a clean and functional sans-serif, for body copy and navigational elements to ensure readability and a modern technical edge.

**Key Principles:**
- Use `display-lg` sparingly for hero sections and collection titles.
- `label-sm` should always be uppercase with generous letter spacing to evoke the feel of high-fashion branding.
- Body text utilizes a lighter weight (300) at larger sizes to maintain an "airy" feel.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy on desktop, centered within a 1440px container to maintain editorial control over line lengths and image placement. 

- **Desktop:** 12-column grid with 24px gutters and 80px outer margins.
- **Tablet:** 8-column grid with 40px margins.
- **Mobile:** 4-column grid with 20px margins.

Vertical rhythm is intentionally loose. Sections are separated by large "stacks" (`stack-xl` or `stack-lg`) to ensure the user focuses on one piece of content at a time. Elements should never feel "crowded"; if in doubt, increase the padding.

## Elevation & Depth

This design system avoids traditional shadows in favor of **Tonal Layers** and **Glassmorphism**. 

- **Level 0 (Base):** Pure White (#FFFFFF).
- **Level 1 (Surface):** Soft White (#F9F9F9) used for cards or secondary sections.
- **Level 2 (Overlay):** Translucent white with a high-density backdrop blur (20px - 40px). This is used for navigation bars, filter menus, and quick-view modals, creating a "frosted glass" effect that allows the colors of the product photography to bleed through subtly.
- **Outlines:** Use 1px solid lines in #000000 for primary buttons and #E0E0E0 for subtle dividers.

## Shapes

The shape language is strictly **Sharp (0px)**. 

To maintain a high-end, architectural feel, all buttons, input fields, image containers, and cards must have square corners. This rigidity contrasts beautifully with the organic forms found in fashion photography. The only exception to this rule is for specialized iconography or circular profile avatars where necessary.

## Components

### Buttons
- **Primary:** Solid black background (#000000) with white text. Sharp corners. No shadow. On hover, the background transitions to a very deep grey (#222222).
- **Secondary:** Transparent background with a 1px black border. 
- **Text Link:** Black text with a 1px underline that disappears on hover, or an animated underline that grows from the center.

### Input Fields
- Underline style preferred. A 1px black bottom border with the label floating above in `label-sm` style. Error states are indicated by a subtle shift to a neutral red, but primarily through text-based feedback to keep the palette clean.

### Cards
- Borderless by default. Use typography and whitespace to define the hit area. For "Product Cards," images should be 4:5 aspect ratio with a subtle grey background placeholder during lazy loading.

### Navigation
- Global navigation utilizes the glassmorphic blur effect. Links are set in `label-sm` with active states indicated by a simple dot or a bold weight shift.

### Chips/Tags
- Small, rectangular boxes with 1px light grey borders and `label-sm` typography. Used for sizes or categories.