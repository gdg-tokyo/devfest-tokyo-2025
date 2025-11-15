# UI Style Guide

This section outlines the key styling conventions and components used across the DevFest Tokyo 2025 website.

## Responsive Layout Policy

The site uses a three-tier responsive layout—mobile (default), tablet (md: ≥ 768 px), and desktop (lg: ≥ 1024 px)—implemented with Tailwind CSS in a mobile-first approach. All sections share a centered container (container mx-auto px-4 lg:px-8 max-w-screen-md lg:max-w-screen-xl) so their inner content aligns horizontally across the page, while section backgrounds may span full width. Grids and flex layouts display as single-column on mobile, multi-column on tablet (e.g., 2 columns), and multi-column on desktop (e.g., 3 columns). Text, images, and components remain centered within this width, using responsive constraints like w-full max-w-sm mx-auto, ensuring consistent alignment and balanced spacing across devices.

## Colors

- **Google Brand Colors**: `google-blue-500`, `google-red-500`, `google-yellow-500`, `google-green-500`
- **Halftone Colors**: `halftone-blue`, `halftone-yellow`, `halftone-red`, `halftone-green`
- **GDG Pastel Colors**: `gdg-pastel-blue`, `gdg-pastel-yellow`, `gdg-pastel-red`, `gdg-pastel-green`
- **Neutrals**: `off-white` (`#f0f0f0`), `black-02` (`#1e1e1e`)

## Typography

- **Primary Font**: `google-sans` (used for general text, headings)
- **Monospace Font**: `roboto-mono` (used for time labels, code-like elements)

## Component Styling

### **Background**

The entire website uses `bg-off-white` (`#f0f0f0`) as its default background color.

### **Panels/Cards (General)**

- **Shape**: `rounded-lg`
- **Border**: `border-2 border-gray-800` (e.g., Session Cards, Timetable Track Headers)

### **Chips (Labels)**

- **Size**: `text-xxs px-1 py-0` (extra small text with minimal padding)
- **Shape**: `rounded-full` (pill shape)
- **Border**: `border border-black` (for outlined style)
- **Text Color**: `text-gray-800` (for better contrast with pastel backgrounds)

### **Color Mapping for Tag/Chips**

Level Label:

- Beginner: `bg-gdg-pastel-blue`
- Intermediate: `bg-gdg-pastel-green`
- Advanced: `bg-gdg-pastel-red`

Perspective Labels:

- Introduction: `bg-google-blue-500`
- Experience: `bg-google-green-500`
- Challenge: `bg-google-red-500`

## Icons

- The material icons are installed. Select it from there.

## Image Guidelines

For speaker icon images located under `public/images/speakers/icons/`:

- **Format:** Must be JPEG.
- **Dimensions:** Maximum height or width of 400px.
- **File Size:** Less than 200KB.
