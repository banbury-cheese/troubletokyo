# Launch Timer

A countdown timer for the Trouble Tokyo site launch.

## Configuration

The timer can be controlled via the `LAUNCH_TIMER_CONFIG` object in `/lib/constants.ts`:

```typescript
export const LAUNCH_TIMER_CONFIG = {
  ENABLE_TIMER: true, // Set to false to disable the timer during development
  LAUNCH_DATE: "2025-08-15T12:00:00-05:00", // August 15th, 2025 at 12:00 PM EST
};
```

## Features

- **Full-screen overlay**: Covers the entire site until launch
- **Animated countdown**: Shows days, hours, minutes, and seconds
- **GSAP animations**: Smooth entrance and pulsing effects on numbers
- **Responsive design**: Adapts to mobile devices
- **Theme integration**: Uses site's color scheme and fonts
- **Development flag**: Easy toggle for development work

## Usage

### To disable during development:

Set `ENABLE_TIMER: false` in the configuration.

### To change launch date:

Update the `LAUNCH_DATE` in the configuration with a valid ISO date string.

## Styling

The timer uses the site's existing design tokens:

- `--charcoalBlack` for background
- `--brightRed` for accents
- `--fontPrimary` (Bankside) for main text
- `--bodyFont` (Bankside SemiCd) for labels

## Animation Effects

- Entrance animation with fade and slide up
- Continuous pulse effect on countdown numbers
- Hover effects on title characters
- Post-launch celebration animation
