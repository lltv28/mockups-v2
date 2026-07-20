# Slide 3 Sizing Revision Design

## Goal

Rebalance slide 3 so the three reason cards feel about 25% smaller and the nine-company logo row feels about 25% larger, while preserving the current structure, wording, animation, and single-row logo layout.

## Approved layout

The moving client-face rows stay unchanged. The logo strip remains directly below the moving faces, and the three reason cards remain directly below the logos.

The reason-card group changes from a 920px maximum width to 690px. Its card padding changes from 18px to 14px, its number circles change from 26px to 20px, its titles change from 14px to 13px, and its body text changes from 12px to 11px with a slightly tighter line height. These combined changes make the cards roughly 25% smaller in both width and height without making the copy difficult to read.

The logo strip maximum width changes from 920px to 1040px. Every logo height and the ClickFunnels wordmark size increase by 25%, rounded to whole pixels. The row gap tightens from 14px to 8px so all nine companies remain on one centered line.

## Exact logo sizes

| Logo | Current | Revised |
|---|---:|---:|
| Mayo Clinic | 28px | 35px |
| ClickFunnels | 12px | 15px |
| Johns Hopkins | 23px | 29px |
| HighLevel | 15px | 19px |
| Fidelity Investments | 14px | 18px |
| ServiceTitan | 14px | 18px |
| Tony Robbins | 9px | 11px |
| H&R Block | 13px | 16px |
| Ramsey Solutions | 14px | 18px |

The shared logo maximum width changes from 118px to 148px.

## Scope boundaries

- Keep every existing embedded logo source unchanged.
- Keep the caption, company order, wording, colors, and grayscale treatment unchanged.
- Keep all moving client faces and their animation unchanged.
- Keep the three reason-card messages unchanged.
- Do not change any other slide.

## Verification

Update the slide 3 structure test to assert the approved card and logo measurements. Run the Node test and production build. Then open slide 3 at 1600 x 900 and confirm that all four moving face rows, all nine larger logos, and all three smaller cards are fully visible with no horizontal or vertical overflow.
