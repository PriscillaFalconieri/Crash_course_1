---
name: csv-geoviz-builder
description: Create modern, dark-themed web applications that allow users to upload, parse, and visualize CSV data on interactive maps using Leaflet.js and PapaParse. Use when building tools for geospatial data exploration with features like drag-and-drop, field mapping, and automatic statistics.
---

# CSV GeoVizualizer Builder

This skill guides the creation of standalone web applications designed to visualize user-uploaded CSV data on interactive maps. It prioritizes a modern "GeoViz" aesthetic (dark theme, amber accents) and robust functionality.

## Core Features to Include

1. **Dark-Themed UI**: Use a charcoal/navy palette (`#0f1419`, `#16202a`) with amber accents (`#f5a623`).
2. **Flexible Ingestion**: Support drag-and-drop, file browsing, and copy-pasting of CSV/TSV data.
3. **Field Mapping**: Allow users to dynamically select which CSV columns represent Latitude, Longitude, Labels, and Severity/Size.
4. **Interactive Map**: Use Leaflet.js with a dark-matter tile layer.
5. **Auto-Detection**: Implement heuristics to automatically guess lat/lon columns (e.g., searching for "lat", "lon", "x", "y").
6. **Data Insights**: Show real-time statistics (point counts, sums) based on the mapped fields.

## Technical Stack

- **Leaflet.js**: For mapping and markers.
- **PapaParse**: For robust CSV/TSV parsing in the browser.
- **Vanilla CSS/JS**: For maximum performance and no-build-step deployment.

## Workflow

### 1. Structure
Generate a single-file HTML (or HTML/JS split) with a sidebar for controls and a full-screen map container.

### 2. Styling (GeoViz Standard)
Use the following CSS variables for consistency:
```css
:root {
  --bg-main: #0f1419;
  --bg-sidebar: #16202a;
  --border: #2f3b47;
  --accent: #f5a623;
  --text-main: #e7e9ea;
  --text-muted: #8b98a5;
}
```

### 3. CSV Parsing Implementation
Use PapaParse's dynamic typing and header support:
```javascript
Papa.parse(text, {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
  complete: (results) => { /* handle data */ }
});
```

### 4. Publication Process (MANDATORY)
Always follow these steps for deployment:

1. **Unique URL**: Save the file with a unique name (e.g., `geoviz_tool.html`, `hospital_mapper.html`) to ensure it has its own URL under the GitHub Pages domain.
2. **Main Branch**: All changes must be pushed to the `main` branch.
3. **GitHub Pages URL Structure**:
   - The URL will be: `https://<username>.github.io/<repository>/<filename>.html`
4. **Verification**: After pushing, wait 60 seconds and provide the direct link to the user.

## Example Components
Refer to the current project's `geoviz.html` for a complete reference of:
- The responsive flexbox layout.
- The drag-and-drop `dropzone` implementation.
- The logic for `fitBounds` when data points are loaded.
- The "Back to Home" button integration.
