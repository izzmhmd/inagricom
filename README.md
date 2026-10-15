# INAGRICOM: Indonesian Agriculture Monitoring Platform
[![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/izzmhmd/inagricom)

INAGRICOM is a Google Earth Engine (GEE) application designed for monitoring key agricultural and environmental parameters across Indonesia. Developed as part of a NASA Space Apps Challenge project, this tool provides users with an interactive platform to analyze satellite data for insights into crop health, drought conditions, and water availability.

## Features

*   **Interactive Map Interface:** Select a region in Indonesia and a time period to visualize geospatial data.
*   **Multi-Parameter Analysis:** Analyze various agricultural and environmental indices from a single, consolidated interface.
*   **Dynamic Charting:** Generate charts for regional statistics (e.g., mean value per district) and time-series trends for any point on the map.
*   **Data Inspection:** Click on the map to retrieve specific values for the selected parameter at that location.
*   **Cropland Focus:** Utilizes ESA WorldCover data to automatically mask and focus analysis on agricultural areas.

## Available Parameters

The platform allows for the analysis of the following parameters:

*   **Precipitation:** Total precipitation analysis using CHIRPS daily data.
*   **Drought Indices:** Calculates the Normalized Difference Drought Index (NDDI) from LANDSAT 8 data to assess vegetation water stress.
*   **Evapotranspiration:** Monitors actual evapotranspiration (ET) and the Crop Water Stress Index (CWSI) using MODIS data.
*   **Crop Health:** Assesses crop health through a custom index derived from an overlay of Sentinel-2's NDVI, NDMI, and NDRE.
*   **Drought Severity:** Visualizes the Keetch-Byram Drought Index (KBDI) to understand long-term drought and fire potential.
*   **Soil Moisture:** Estimates the Soil Moisture Index (SMI) based on Land Surface Temperature from LANDSAT 8.

## Data Sources

INAGRICOM leverages a variety of public satellite data collections available on Google Earth Engine:

*   **LANDSAT 8 OLI/TIRS:** For Drought and Soil Moisture indices.
*   **COPERNICUS/S2_SR_HARMONIZED (Sentinel-2):** For Crop Health analysis.
*   **MODIS/061/MOD16A2:** For Evapotranspiration data.
*   **UCSB-CHG/CHIRPS/DAILY:** For precipitation data.
*   **UTOKYO/WTLAB/KBDI/v1:** For the Keetch-Byram Drought Index.
*   **ESA/WorldCover/v200:** Used for masking and focusing analysis on cropland areas.

## How to Use

This application is a Google Earth Engine script and is not a standalone program.

1.  **Prerequisites:** You must have a [Google Earth Engine account](https://earthengine.google.com/).
2.  **Access the Code:** Open the [GEE Code Editor](https://code.earthengine.google.com/).
3.  **Copy Script:** Copy the entire content of `mainscript.js` from this repository and paste it into a new script file in the GEE Code Editor.
4.  **Dependencies:** This script relies on GEE Feature Collection assets for Indonesian administrative boundaries. You will need to import your own assets for regencies (`IDNKAB`) and districts (`IDNKEC`) and ensure they are correctly named in the script.
5.  **Run:** Click the `Run` button in the Code Editor. The INAGRICOM interface will appear in the side panel.

### Using the Interface

1.  **Select Region:** Enter the name of a regency (e.g., `Kota Semarang`) in the 'Select Region' textbox.
2.  **Select Date:** Specify the start and end dates for your analysis in `YYYY-MM-DD` format.
3.  **Select Parameter:** Click on one of the parameter buttons (e.g., `Crop Health`, `Drought Indices`).
4.  **Analyze:** The map will update to display the selected data layer. Charts showing area statistics per district will appear below the control panel.
5.  **Inspect:** Click on any location on the map to generate a time-series chart and see the point-specific value in the information panel.
