//---- NASA SPACE APP CHALLENGE

var palettes = require('users/gena/packages:palettes');
var palette = palettes.  colorbrewer.RdBu[7].reverse();

Map.setCenter(113.72099940509655, -0.4305111583765818, 5);
Map.setOptions('HYBRID');

//VISUALIZATIONS
var vizNDDI = {
  min: 0,
  max: 1,
  //palette: colorizedVis
  palette: ['green','00ff00','yellow','orange','red']
};
var vizFase = {
  min: 0,
  max: 4,
  //palette: colorizedVis
  palette: ['red','orange','yellow','6ffe5f','green']
};
var vizNDDIKelas = {
  min: 0,
  max: 4,
  palette: ['009933','00ff00','yellow','orange','red']
};
var visualizations = {
  bands: ['SR_B4', 'SR_B3', 'SR_B2'],
  min: 0.0,
  max: 0.3,
};
var visTOA = {
  bands: ['B4', 'B3', 'B2'],
  min: 0.0,
  max: 0.3,
};
var visFalseTOA= {
  bands: ['B7', 'B5', 'B4'],
  min: 0.0,
  max: 0.35,
};
var visFalse= {
  bands: ['SR_B7', 'SR_B5', 'SR_B4'],
  min: 0.0,
  max: 0.35,
};

var viz = { 
  min: -1,
  max: 1,
  //palette: palette,
  palette: ['blue', 'blue', 'red', 'red']
  //palette: ['248b14', '32ba05', '6ffe5f', 'fdfd3a', 'f03b20', 'f05508', 'bd0026']
};

var visual = {
  min: 0,
  max: 5000,
  bands: ['B12', 'B8A', 'B4'],
};

var visndvi = {
  min: 0,
  max: 1.0,
  palette: [
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'
  ],
};

var visnddi = {
  min: 0.1,
  max: 0.3,
  palette: ['2aac00', '7ceb36', 'f7f7f7', 'effd1d', 'ef8a21', 'b2182b'],
};

var vislst = {
  min: 18,
  max: 35,
  palette: ['blue','green','yellow','orange','red']
};

var vislst2 = {
  min: 18,
  max: 35,
  //palette: palette,
  //palette: ['blue','green','yellow','orange','red']
  palette: ['248b14', '32ba05', '6ffe5f', 'fdfd3a', 'f03b20', 'f05508', 'bd0026']
};

var CLASS_NAMES = [
    'water', 'trees', 'grass', 'flooded_vegetation', 'crops',
    'shrub_and_scrub', 'built', 'bare', 'snow_and_ice'];

var VIS_PALETTE = [
    '419BDF', '397D49', '88B053', '7A87C6',
    'E49635', 'DFC35A', 'C4281B', 'A59B8F',
    'B39FE1'];

var symbology = {
color: 'red',
fillColor : 'FFFFFF00',
width: 1,
};

var rgbVis = {
  min: 0.0,
  max: 0.3,
  bands: ['B4', 'B3', 'B2'],
};



//FUNGSI SKALA
function scaleLST(image){
  var skala = image.multiply(0.02).subtract(273.15);
  return image.addBands(skala, null, true);
}
function scaleNDVI(image){
  var skala2 = image.multiply(0.0001);
  return image.addBands(skala2, null, true);
}

//PANEL
var mainPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical', true),
  style: {width: '450px', padding: '20px'}
});
var datePanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal', true)
});
var luasPanel = ui.Panel();
var legendPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal', true),
  style: {position: 'bottom-left'}
}); 
ui.root.add(mainPanel);

//PANEL TOMBOL
var paramPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal', true)
});
var paramPanel2 = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal', true)
});

//TITLE
var titleLabel = ui.Label({
  value: 'INAGRICOM',
  style:{color:'green', fontSize:'28px', fontWeight:'bold',fontFamily:'monospace',textAlign:'center', margin:'10px 10px 0px 125px'},
  //style: {fontWeight: 'bold', fontSize: '20px', color: 'black'}
});
var Title2=ui.Label({
  value:'Indonesian Agriculture Monitoring Platform',
  style:{color:'black', fontSize:'20px', fontWeight:'bold',fontFamily:'monospace',textAlign:'center', margin:'0px 10px 10px 10px'},
});

//REGION
var cityText = ui.Textbox({
  value: 'Kota Semarang',
  style: {width: '120px'}
});
var CityLabel = ui.Label({
  value: 'Select Region',
  style: {fontWeight: 'bold'}
});


var paramLabel = ui.Label({
  value: 'Select Parameter',
  style: {fontWeight: 'bold'}
});
var dateLabel = ui.Label({
  value: 'Select Interval Date (Year-Month-Day)',
  style: {fontWeight: 'bold'}
});
var startDate = ui.Textbox({
  value: '2024-01-01',
  placeholder: 'Masukkan Tanggal Awal',
  style: {width: '150px'}
});
var endDate = ui.Textbox({
  value: '2024-09-01',
  placeholder: 'Masukkan Tanggal Akhir',
  style: {width: '150px'}
});
var hubungLabel = ui.Label({value: '-',style: {width: '5px'}});
datePanel.add(startDate);
datePanel.add(hubungLabel);
datePanel.add(endDate);

//Button
var chButton = ui.Button({
  label: 'Precipitation',
  onClick: MulaiCH
});
var nddiButton = ui.Button({
  label: 'Drought Indices',
  onClick: MulaiNDDI
});
var evapoButton = ui.Button({
  label: 'Evapotranspiration',
  onClick: MulaiET
});
var kbdiButton = ui.Button({
  label: 'Drought Severity',
  onClick: MulaiKBDI
});
var cropButton = ui.Button({
  label: 'Crop Health',
  onClick: MulaiCrop
});
var smapButton = ui.Button({
  label: 'Soil Moisture',
  onClick: MulaiSMI
});

//LEGENDA LABEL
var chartLabel = ui.Label({
  value: 'Grafik Perubahan:',
  style: {fontWeight: 'bold'}
});

var legendLabel = ui.Label({
  value: 'Legenda',
  style: {fontWeight: 'bold'}
});

var ketLabel = ui.Label({
  value: 'Information and Chart',
  style: {fontWeight: 'bold'}
});

var noChart = ui.Label({
  value: 'Chart Not Found',
});
var noKet = ui.Label({
  value: 'Information Not Found',
});

    // ADD PANEL
    mainPanel.clear();
    mainPanel.add(titleLabel);
    mainPanel.add(Title2);
    mainPanel.add(CityLabel);
    mainPanel.add(cityText);
    mainPanel.add(dateLabel);
    mainPanel.add(datePanel);
    mainPanel.add(paramLabel);  
    paramPanel.add(cropButton);
    paramPanel.add(nddiButton);
    paramPanel.add(evapoButton);
    mainPanel.add(paramPanel);
    paramPanel2.add(chButton);
    paramPanel2.add(kbdiButton);   
    paramPanel2.add(smapButton);
    mainPanel.add(paramPanel2);
    
    
//CHART
var chartPanel = ui.Panel();
var chartPanel2 = ui.Panel();
var koordPanel = ui.Panel();

//LEGEND
var legend3 = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '4px 3px'
  }
});

//INSPECTOR
//POSISI PANEL
var inspectPanel = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '4px 3px'
  }
});
var inspectPanel2 = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '4px 3px'
  }
});

//FUNGSI KLIK MULAI

//---------------------------RAINFALL
function MulaiCH(){
  Map.layers().reset();
  chartPanel2.clear();
  var name = cityText.getValue();
  var aoi = IDNKAB.filter(ee.Filter.inList('NAME_2',[name]));
  var start = startDate.getValue();
  var end = endDate.getValue();
  Map.centerObject(aoi);
  Map.addLayer(aoi.style(symbology),{},'Batas Adm');
var palettes = require('users/gena/packages:palettes');
var palette = palettes.colorbrewer.Blues[3];

var dataset = ee.ImageCollection('UCSB-CHG/CHIRPS/DAILY')
                  .filterDate(start, end)
                  .filterBounds(aoi)
                  .sum()
                  .clip(aoi);
var precipitation = dataset.select('precipitation');

var precipitationVis = {
  min: 1000,
  max: 4000,
  palette: palette,
};
var visPcp = {
  min: 1500, 
  max: 3000, 
  palette: [
    'cccccc','f9f3d5','dce2a8','a8c58d','77a87d','ace8f8',
    '4cafd9','1d5ede','001bc0','9131f1','e983f3','f6c7ec'
  ]};
Map.addLayer(precipitation, visPcp, 'Total Precipitation (mm)');

//RAINFALL MEAN PER DISTRICT
var aoiKec = IDNKEC.filter(ee.Filter.inList('NAME_2',[name]));
function getMeanCH(feature) {
  var CHmean = precipitation.reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: feature.geometry(),
    scale: 5566
  }).get('precipitation');
  return feature.set({'precipitation': CHmean,});
}
var district_meanCH = aoiKec.map(getMeanCH);
var chartMeanCH = ui.Chart.feature.byFeature({
  features: district_meanCH,
  xProperty: 'NAME_3',
  yProperties: ['precipitation']
}).setOptions({
  title: 'Mean Precipitation per District',
  hAxis: {title: 'District'},
  vAxis: {title: 'Precipitation (mm)'},
  series: {0: {color: '003cb3', label: 'Precipitation'},},
  legend: {position: 'bottom'}
}).setChartType('ColumnChart');
chartPanel2.add(chartMeanCH)

    //legenda
var legendTitle = ui.Label({
  value: 'Total Precipitation (mm)',
  style: {
    fontWeight: 'bold',
    fontSize: '15px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
var long = ee.Image.pixelLonLat().select('latitude');
var gradient = long;
var legendImage = gradient.visualize(visPcp);
var panelmin = ui.Panel({
    widgets: [ui.Label(visPcp['min'])
    ],
});
var thumbnail = ui.Thumbnail ({
  image: legendImage,
  params: {bbox:'0,0,500,3800', dimensions: '10x150'},
  style: {padding: '1px', position: 'bottom-center'}
});
var panelmax = ui.Panel({
    widgets: [ui.Label(visPcp['max'])
    ],
});
legend3.clear();
legendPanel.clear();
legend3.add(legendTitle);
legend3.add(panelmax);
legend3.add(thumbnail);
legend3.add(panelmin);
inspectPanel.clear();
inspectPanel2.clear();
chartPanel.clear();
koordPanel.clear();
//INSPECT
//Define callback function
var lon = ui.Label();
var lat = ui.Label();
function showValue7(value7) {
  var judulLabel7 = ui.Label({
    value: 'Precipitation (mm)',
    style: {
      fontWeight: 'bold',
    }
  });
  var valueLabel7 = ui.Label(value7);

  inspectPanel.clear();
  inspectPanel2.clear();
  inspectPanel.add(judulLabel7);
  inspectPanel.add(valueLabel7);
}
//
function inspect7(coords) {
 inspectPanel.clear();
 inspectPanel2.clear();
  chartPanel.clear();
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var konsentrat = precipitation.reduceRegion({
    reducer: ee.Reducer.sum(),
    geometry: point,
    scale: 5566
  }).get('precipitation');

  konsentrat.evaluate(showValue7);
  //CHART
  var imageschart = chirps5d.filterBounds(aoi)
    .filterDate(start, end)
    .select('precipitation')
    //.map(scaleNDVI); 
  lon.setValue('Lat.: ' + coords.lon.toFixed(5)),
  lat.setValue('Long.: ' + coords.lat.toFixed(5));
  var point2 = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point2);
  //Map.layers().set(1, dot);
  chartPanel.clear();
  var chChart = ui.Chart.image.series(imageschart, point, ee.Reducer.mean(), 5566);
  chChart.setSeriesNames(['Rerata CH']);
  chChart.setOptions({
      title: 'Grafik Rerata Curah Hujan',
      trendlines: {0:{showR2:true,visibleInLegend:true}}
  });
  chartPanel.add(chChart);
}
koordPanel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
Map.onClick(inspect7);

Map.add(legend3);
}


//----------------------------------------------------
                //DROUGHT INDICES
//----------------------------------------------------
function MulaiNDDI(){
  Map.layers().reset();
  luasPanel.clear();
  chartPanel.clear();
  chartPanel2.clear();
  inspectPanel.clear();
  inspectPanel2.clear();
  
  var start = startDate.getValue();
  var end = endDate.getValue();
  var name = cityText.getValue();
  var aoi = IDNKAB.filter(ee.Filter.inList('NAME_2',[name]));
//-------------------------------------------------------
                      //CALCULATING NDDI
//------------------------------------------------------- 
// Applies scaling factors.
function applyScaleFactors(image) {
  var opticalBands = image.select('SR_B.').multiply(0.0000275).add(-0.2);
  var thermalBands = image.select('ST_B.*').multiply(0.00341802).add(149.0);
  return image.addBands(opticalBands, null, true)
              .addBands(thermalBands, null, true);
}
// Applies cloud mask
function cloudMaskforCrop(image) {
  var ESAWC = ee.ImageCollection('ESA/WorldCover/v200').first().select('Map');
  var Crop = ESAWC.eq(40).selfMask();   
  var cloudShadowBitmask = (1 << 3);
  var cloudBitmask = (1 << 5);
  var gabungdata = image.addBands(ESAWC);
  var qa = gabungdata.select('QA_PIXEL');
  var LC = gabungdata.select('Map');
  var mask = qa.bitwiseAnd(cloudShadowBitmask).eq(0)
                .and(qa.bitwiseAnd(cloudBitmask).eq(0)).or(LC.eq(40));
  
  return image.updateMask(mask);
}
  //FUNCTION OF SPECTRAL INDICES   
var indicesInput = function(img){
  // NDVI
  var ndvi = img.normalizedDifference(['SR_B5','SR_B4']).rename('NDVI');
  //NDWI
  var ndwi = img.normalizedDifference(['SR_B5','SR_B6']).rename('NDWI');
  return img.addBands(ndvi).addBands(ndwi);
};
var indicesNDDI = function(img){
  var nddi = img.expression(
  '(NDVI-NDWI)/(NDVI+NDWI)', {'NDVI': img.select('NDVI'),
  'NDWI': img.select('NDWI')
  }).rename('NDDI');
  return img.addBands(nddi);
};

//-------------------------------------------------------
                      //DATASETS
//-------------------------------------------------------

var dataset2 = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
    .filterBounds(aoi)
    .filterDate(start, end)
    .filterMetadata('CLOUD_COVER', 'less_than', 30)
    .map(applyScaleFactors)
    .map(cloudMaskforCrop)
    .map(indicesInput)
    .map(indicesNDDI)
    .median()
    .clip(aoi);

//ESA WC CROPLAND MASKING
var datasetWC = ee.ImageCollection('ESA/WorldCover/v200').first().select('Map').clip(aoi);
var Cropland = datasetWC.eq(40).selfMask();
var VegDI = dataset2.select('NDDI').updateMask(Cropland);

//CLASSIFICATION OF NDDI          
var Kelas = ee.Image(1)
          .where(VegDI.lt(0.01), 0)
          .where(VegDI.gte(0.01).and(VegDI.lt(0.15)), 1)
          .where(VegDI.gte(0.15).and(VegDI.lt(0.25)), 2)
          .where(VegDI.gte(0.25).and(VegDI.lt(1)), 3)
          .where(VegDI.gte(1),4)
          .clip(aoi).updateMask(VegDI);

Map.centerObject(aoi,10);
Map.addLayer(aoi.style(symbology),{},'Batas Adm');
Map.addLayer(dataset2,visualizations,'RGB',false);
Map.addLayer(dataset2,visFalse,'False Color',false);
//Map.addLayer(Cropland)
Map.addLayer(VegDI, vizNDDI, 'Drought Value',false);
Map.addLayer(Kelas, vizNDDIKelas, 'Drought Class');

  //LUASAN
var Area = ee.Image.pixelArea().divide(100*100).addBands(Kelas)
  .reduceRegion({
    reducer: ee.Reducer.sum().group({
      groupField: 1,
      groupName: 'code',
    }),
    geometry: aoi,
    scale:100,
    bestEffort:true,
    maxPixels:1e9 
  }).get('groups');
  
var area_chart = ui.Chart.image.byClass({
  image: ee.Image.pixelArea().divide(1e4).addBands(Kelas) , 
  classBand: 'constant' , 
  region: aoi, 
  reducer: ee.Reducer.sum(), 
  scale: 30, 
  classLabels:['Normal','Mild','Moderate', 'High','Extreme']
  })//.setSeriesNames(ee.List(['Tidak Ada','Ringan','Sedang', 'Kuat','Ekstrem']))
  .setOptions({title: 'Area Class',vAxis: {title: 'Area (Ha)'},colors: ['248b14','6ffe5f','fdfd3a','f03b20','bd0026']});
chartPanel2.add(area_chart)

//CHART LUASAN PER KECAMATAN
var KECIDN = IDNKEC.filter(ee.Filter.inList('NAME_2',[name]));
var luas1= Kelas.eq(0).multiply(ee.Image.pixelArea()).divide(10000).reduceRegions({
  collection: KECIDN,
  reducer: ee.Reducer.sum(),
  scale: 30,
  crs: 'EPSG:4326'
  });
var luas2 = Kelas.eq(1).multiply(ee.Image.pixelArea()).divide(10000).reduceRegions({
  collection: KECIDN,
  reducer: ee.Reducer.sum(),
  scale: 30,
  crs: 'EPSG:4326'
  });
var luas3 = Kelas.eq(2).multiply(ee.Image.pixelArea()).divide(10000).reduceRegions({
  collection: KECIDN,
  reducer: ee.Reducer.sum(),
  scale: 30,
  crs: 'EPSG:4326'
  });
var luas4 = Kelas.eq(3).multiply(ee.Image.pixelArea()).divide(10000).reduceRegions({
  collection: KECIDN,
  reducer: ee.Reducer.sum(),
  scale: 30,
  crs: 'EPSG:4326'
  });
var luas5 = Kelas.eq(4).multiply(ee.Image.pixelArea()).divide(10000).reduceRegions({
  collection: KECIDN,
  reducer: ee.Reducer.sum(),
  scale: 30,
  crs: 'EPSG:4326'
  });
var gabungData = luas1.map(function(feature){
var kecamatan = feature.get('NAME_3');
var luas1= ee.Number(feature.get('sum'));
var luas2_2 = ee.Number(luas2.filter(ee.Filter.eq('NAME_3', kecamatan)).first().get('sum'));
var luas3_3 = ee.Number(luas3.filter(ee.Filter.eq('NAME_3', kecamatan)).first().get('sum'));
var luas4_4 = ee.Number(luas4.filter(ee.Filter.eq('NAME_3', kecamatan)).first().get('sum'));
var luas5_5 = ee.Number(luas5.filter(ee.Filter.eq('NAME_3', kecamatan)).first().get('sum'));
  return ee.Feature(null, {
    'NAME_3': kecamatan,
    'Normal': luas1,
    'Mild': luas2_2,
    'Moderate': luas3_3,
    'High': luas3_3,
    'Extreme': luas3_3,
    });
  });
var AreaChartKec = ui.Chart.feature.byFeature({
  features: gabungData,
  xProperty: 'NAME_3',
  yProperties: ['Normal', 'Mild','Moderate','High','Extreme']
  }).setChartType('ColumnChart')
  .setOptions({
    title: 'Area Class per District',
    hAxis: {title: 'District'},
    vAxis: {title: 'Area (Ha)'},
    series: {
    0: {color: '009933', label: 'Normal'},
    1: {color: '00ff00', label: 'Mild'},
    2: {color: 'yellow', label: 'Moderate'},
    3: {color: 'orange', label: 'High'},
    4: {color: 'red', label: 'Extreme'},
  },
  });
chartPanel2.add(AreaChartKec)

//LEGEND
var panel = ui.Panel({
  style: {position: 'bottom-left',padding: '5px;'}
});
var title = ui.Label({
  value: 'Drought Class',
  style: {
    fontWeight: 'bold',
    fontSize: '13px',
    margin: '100px;'
  }
});
panel.add(title);
var color = ['248b14','6ffe5f','fdfd3a','ffa500','bd0026'];
var lc_class = ['Normal', 'Mild', 'Moderate', 'High','Extreme'];
var list_legend = function(color, description) {
  var c = ui.Label({
    style: {
      backgroundColor: color,
      padding: '10px',
      margin: '4px'
    }
  })
  var ds = ui.Label({
    value: description,
    style: {
      margin: '5px',
      fontSize: '12px',
    }
  })
  return ui.Panel({
    widgets: [c, ds],
    layout: ui.Panel.Layout.Flow('horizontal'),
  })
}
for(var a = 0; a < 5; a++){
  panel.add(list_legend(color[a], lc_class[a]))
}
legend3.clear();
legendPanel.clear();
legendPanel.add(panel);
Map.add(legendPanel)
inspectPanel.clear();
inspectPanel2.clear();
chartPanel.clear();
koordPanel.clear();

//INSPECT
//Define callback function
var lon = ui.Label();
var lat = ui.Label();
function showValue7(value7) {
  var judulLabel7 = ui.Label({
    value: 'Drought Value',
    style: {
      fontWeight: 'bold',
    }
  });
  var valueLabel7 = ui.Label(value7);

  inspectPanel.clear();
  inspectPanel2.clear();
  inspectPanel.add(judulLabel7);
  inspectPanel.add(valueLabel7);
}
//
function inspect7(coords) {
 inspectPanel.clear();
 inspectPanel2.clear();
  var start = startDate.getValue();
  var end = endDate.getValue();
  var name = cityText.getValue();
  var aoi = IDNKAB.filter(ee.Filter.inList('NAME_2',[name]));
//-------------------------------------------------------
                      //CALCULATING VHI - ADDED TO THIS FUNCTION TO AVOID ERROR
//------------------------------------------------------- 
// Applies scaling factors.
function applyScaleFactors(image) {
  var opticalBands = image.select('SR_B.').multiply(0.0000275).add(-0.2);
  var thermalBands = image.select('ST_B.*').multiply(0.00341802).add(149.0);
  return image.addBands(opticalBands, null, true)
              .addBands(thermalBands, null, true);
}
// Applies cloud mask
function cloudMaskforCrop(image) {
  var ESAWC = ee.ImageCollection('ESA/WorldCover/v200').first().select('Map');
  var Crop = ESAWC.eq(40).selfMask();   
  var cloudShadowBitmask = (1 << 3);
  var cloudBitmask = (1 << 5);
  var gabungdata = image.addBands(ESAWC);
  var qa = gabungdata.select('QA_PIXEL');
  var LC = gabungdata.select('Map');
  var mask = qa.bitwiseAnd(cloudShadowBitmask).eq(0)
                .and(qa.bitwiseAnd(cloudBitmask).eq(0)).or(LC.eq(40));
  
  return image.updateMask(mask);
}
  //FUNCTION OF SPECTRAL INDICES   
var indicesInput = function(img){
  // NDVI
  var ndvi = img.normalizedDifference(['SR_B5','SR_B4']).rename('NDVI');
  //NDWI
  var ndwi = img.normalizedDifference(['SR_B5','SR_B6']).rename('NDWI');
  return img.addBands(ndvi).addBands(ndwi);
};
var indicesNDDI = function(img){
  var nddi = img.expression(
  '(NDVI-NDWI)/(NDVI+NDWI)', {'NDVI': img.select('NDVI'),
  'NDWI': img.select('NDWI')
  }).rename('NDDI');
  return img.addBands(nddi);
};

//DATASETS
var imageNDDI = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
    .filterBounds(aoi)
    .filterDate(start, end)
    .filterMetadata('CLOUD_COVER', 'less_than', 30)
    .map(applyScaleFactors)
    .map(cloudMaskforCrop)
    .map(indicesInput)
    .map(indicesNDDI)
    .mean()
    .clip(aoi);
  
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var konsentrat = imageNDDI.select('NDDI').reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: point,
    scale: Map.getScale()
  }).get('NDDI');
  konsentrat.evaluate(showValue7);
  
  //CHART
var imagesChart = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
    .filterBounds(aoi)
    .filterDate('2023-01-01', end)
    .filterMetadata('CLOUD_COVER', 'less_than', 30)
    .map(applyScaleFactors)
    .map(cloudMaskforCrop)
    .map(indicesInput)
    .map(indicesNDDI);
  lon.setValue('Lat.: ' + coords.lon.toFixed(5)),
  lat.setValue('Long.: ' + coords.lat.toFixed(5));
  var point2 = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point);
  //Map.layers().set(1, dot);
  chartPanel.clear();
    var chartz = ui.Chart.image.seriesByRegion({
      imageCollection: imagesChart,
      regions: point,
      reducer: ee.Reducer.mean(),
      band: 'NDDI',
      scale: 30,
      xProperty: 'system:time_start'
    }).setSeriesNames(['Nilai']).setChartType('LineChart');
      chartz.setOptions({
      title: 'Drought Indices Chart',
      trendlines: {0:{showR2:true,visibleInLegend:true}}
  });
chartPanel.add(chartz);
}
koordPanel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
Map.onClick(inspect7);
} //END OF NDDI FUNCTION



//---------------EVAPOTRANSPIRATION
function MulaiET(){
  chartPanel2.clear();
  Map.layers().reset();
  var start = startDate.getValue();
  var end = endDate.getValue(); 
  var name = cityText.getValue();
  var aoi = IDNKAB.filter(ee.Filter.inList('NAME_2',[name]));
  Map.centerObject(aoi,10);
  Map.addLayer(aoi.style(symbology),{},'Batas Adm');
var dataset = ee.ImageCollection('MODIS/061/MOD16A2')
                  .filterDate(start, end)
                  .filterBounds(aoi)
                  .mean()
                  .clip(aoi);
var evapotranspiration = dataset.select('ET');
var PET = dataset.select('PET');
var CWSI = dataset.expression(
  '1 - (ET/PET)', {'ET': dataset.select('ET'),
  'PET': dataset.select('PET')
  }).rename('CWSI');
var evapotranspirationVis = {
  min: 0,
  max: 300,
  palette: [
    'ffffff', 'fcd163', '99b718', '66a000', '3e8601', '207401', '056201',
    '004c00', '011301'
  ],
};
var cwsiVis = {
  min: 0,
  max: 1,
  palette: [
    'ffffff', 'fcd163', '99b718', '66a000', '3e8601', '207401', '056201',
    '004c00', '011301'
  ],
};
Map.addLayer(evapotranspiration, evapotranspirationVis, 'Evapotranspiration');
Map.addLayer(CWSI, cwsiVis, 'Crop Water Stress Index');

//CHART PER DISTRICT
//EVAPOTRANS
var aoiKec = IDNKEC.filter(ee.Filter.inList('NAME_2',[name]));
function getMeanET(feature) {
  var ET = evapotranspiration.reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: feature.geometry(),
    scale: 500
  }).get('ET');
  return feature.set({'ET': ET,});
}
var district_meanET = aoiKec.map(getMeanET);
var chartMeanET = ui.Chart.feature.byFeature({
  features: district_meanET,
  xProperty: 'NAME_3',
  yProperties: ['ET']
}).setOptions({
  title: 'Mean Evapotranspiration per District',
  hAxis: {title: 'District'},
  vAxis: {title: 'Evapotranspiration'},
  series: {0: {color: '207401', label: 'ET'},},
  legend: {position: 'bottom'}
}).setChartType('ColumnChart');
//CWSI
function getMeanCWSI(feature) {
  var cwsimean = CWSI.reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: feature.geometry(),
    scale: 500
  }).get('CWSI');
  return feature.set({'CWSI': cwsimean,});
}
var district_meanCWSI = aoiKec.map(getMeanCWSI);
var chartMeanCWSI = ui.Chart.feature.byFeature({
  features: district_meanCWSI,
  xProperty: 'NAME_3',
  yProperties: ['CWSI']
}).setOptions({
  title: 'Mean CWSI per District',
  hAxis: {title: 'District'},
  vAxis: {title: 'CWSI value'},
  series: {0: {color: '66a000', label: 'CWSI'},},
  legend: {position: 'bottom'}
}).setChartType('ColumnChart');
chartPanel2.add(chartMeanET)
chartPanel2.add(chartMeanCWSI)



//LEGEND
var legendTitle = ui.Label({
  value: 'Evapotranspiration',
  style: {
    fontWeight: 'bold',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
var legendTitle2 = ui.Label({
  value: 'Crop Water Stress Index',
  style: {
    fontWeight: 'bold',

    margin: '0 0 4px 0',
    padding: '0'
    }
});
//create the legend image
var lon2 = ee.Image.pixelLonLat().select('longitude');
var gradient = lon2;
var legendImage = gradient.visualize(evapotranspirationVis);
var legendImage2 = gradient.visualize(cwsiVis);
//create text on top of legend
var labelLow = ui.Panel({
    widgets: [ui.Label('Low')
    ],
});
var labelLow2 = ui.Panel({
    widgets: [ui.Label('Low')
    ],
});
//create thumbnail from the image
var thumbnail = ui.Thumbnail ({
  image: legendImage,
  params: {bbox:'0,0,150,200',dimensions: '200x15'},
  style: {padding: '1px', position: 'top-center'}
});
var thumbnail2 = ui.Thumbnail ({
  image: legendImage2,
  params: {bbox:'0,0,1,1',dimensions: '200x15'},
  style: {padding: '1px', position: 'top-center'}
});
//create text on top of legend
var labelHigh = ui.Panel({
    widgets: [ui.Label('High')
    ],
});
var labelHigh2 = ui.Panel({
    widgets: [ui.Label('High')
    ],
});

var etLegend = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  widgets: [legendTitle, labelLow, thumbnail, labelHigh],
  style: {position: 'bottom-left',padding: '8px 4px'}});
var cwsiLegend = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  widgets: [legendTitle2, labelLow2, thumbnail2, labelHigh2],
  style: {position: 'bottom-left',padding: '8px 4px'}});
  
var LegendAll = ui.Panel({
  widgets: [etLegend, cwsiLegend],
  });
legend3.clear();
legendPanel.clear();
legend3.add(LegendAll);
Map.add(legend3)
inspectPanel.clear();
inspectPanel2.clear();
chartPanel.clear();
koordPanel.clear();
//INSPECT
//Define callback function
var lon = ui.Label();
var lat = ui.Label();
function showValue8(value8) {
  var judulLabel8 = ui.Label({
    value: 'Evapotranspiration (kg/m^2)',
    style: {
      fontWeight: 'bold',
    }
  });
  var valueLabel8 = ui.Label(value8);

  inspectPanel.clear();
  inspectPanel.add(judulLabel8);
  inspectPanel.add(valueLabel8);
}
function showValue9(value9) {
  var judulLabel9 = ui.Label({
    value: 'CWSI Value',
    style: {
      fontWeight: 'bold',
    }
  });
  var valueLabel9 = ui.Label(value9);

  inspectPanel2.clear();
  inspectPanel2.add(judulLabel9);
  inspectPanel2.add(valueLabel9);
}
//
function inspect7(coords) {
  inspectPanel.clear();
  inspectPanel2.clear();
  chartPanel.clear();
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var konsentrat = evapotranspiration.reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: point,
    scale: 500
  }).get('ET');
  var konsentrat2 = CWSI.reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: point,
    scale: 500
  }).get('CWSI');

  konsentrat.evaluate(showValue8);
  konsentrat2.evaluate(showValue9);
  //CHART
  var indicesCWSI = function(img){
  var cwsi = img.expression(
  '1 - (ET/PET)', {'ET': img.select('ET'),
  'PET': img.select('PET')
  }).rename('CWSI');
  return img.addBands(cwsi);
  };
  
  var imageschart = ee.ImageCollection('MODIS/061/MOD16A2').filterBounds(aoi)
    .filterDate(start, end)
    .select('ET')
  var imageschartCWSI = ee.ImageCollection('MODIS/061/MOD16A2').filterBounds(aoi)
    .filterDate(start, end)
    .map(indicesCWSI)
    .select('CWSI');
  lon.setValue('Lat.: ' + coords.lon.toFixed(5)),
  lat.setValue('Long.: ' + coords.lat.toFixed(5));
  var point2 = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point2);
  //Map.layers().set(1, dot);
  chartPanel.clear();
  var evaChart = ui.Chart.image.series(imageschart, point, ee.Reducer.mean(), 500).setSeriesNames(['ET'])
  .setOptions({
      title: 'Evapotranspration',
      trendlines: {0:{showR2:true,visibleInLegend:true}}
  });
var cwsiChart = ui.Chart.image.series(imageschartCWSI, point, ee.Reducer.mean(), 500).setSeriesNames(['CWSI'])
  .setOptions({
      title: 'Crop Water Stress Index',
      trendlines: {0:{showR2:true,visibleInLegend:true}}
  });
  chartPanel.add(evaChart);
  chartPanel.add(cwsiChart);
}
koordPanel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
Map.onClick(inspect7);
} // END OF EVAPOTRANSPIRATION CHART


//--------------------------------------------
                          //CROP HEALTH
//--------------------------------------------
function MulaiCrop(){
  Map.layers().reset();
  luasPanel.clear();
  chartPanel.clear();
  chartPanel2.clear();
  inspectPanel.clear();
  
  var start = startDate.getValue();
  var end = endDate.getValue();
  var name = cityText.getValue();
  var aoi = IDNKAB.filter(ee.Filter.inList('NAME_2',[name]));
  //SENTINEL-2
function maskS2clouds(image) { 
  var ESAWC = ee.ImageCollection('ESA/WorldCover/v200').first().select('Map');
  var Crop = ESAWC.eq(40).selfMask();   
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  var gabungdata = image.addBands(ESAWC);
  var qa = gabungdata.select('QA60');
  var LC = gabungdata.select('Map');
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0)).or(LC.eq(40));
  return image.updateMask(mask).divide(10000);
}
  //FUNCTION OF SPECTRAL INDICES   
var indicesInput = function(img){
  // NDVI
  var ndvi = img.normalizedDifference(['B8','B4']).rename('NDVI');
  //NDMI
  var ndmi = img.normalizedDifference(['B8','B11']).rename('NDMI');
  //NDRE
  var ndre = img.normalizedDifference(['B8','B5']).rename('NDRE');
  return img.addBands(ndvi).addBands(ndmi).addBands(ndre);
};

var indicesClass = function(img){
  var datasetWC = ee.ImageCollection('ESA/WorldCover/v200').first().select('Map').clip(aoi);
  var Cropland = datasetWC.eq(40).selfMask();
  var datandvi = img.select('NDVI').updateMask(Cropland);
  var datandmi = img.select('NDMI').updateMask(Cropland);
  var datandre = img.select('NDRE').updateMask(Cropland);
  var class_ndvi = ee.Image(1)
          .where(datandvi.lt(0.22), 1)
          .where(datandvi.gte(0.22).and(datandvi.lt(0.42)), 2)
          .where(datandvi.gte(0.42).and(datandvi.lt(0.72)), 3)
          .where(datandvi.gte(0.72),4)
          .clip(aoi).updateMask(datandvi).rename('NDVI_Class');
  var class_ndmi = ee.Image(1)
          .where(datandmi.lt(0), 1)
          .where(datandmi.gte(0).and(datandmi.lt(0.2)), 2)
          .where(datandmi.gte(0.2).and(datandmi.lt(0.4)), 3)
          .where(datandmi.gte(0.4),4)
          .clip(aoi).updateMask(datandvi).rename('NDMI_Class');
  var class_ndre = ee.Image(1)
          .where(datandre.lt(0.2), 1)
          .where(datandre.gte(0.2).and(datandre.lt(0.4)), 2)
          .where(datandre.gte(0.4).and(datandre.lt(0.6)), 3)
          .where(datandre.gte(0.6),4)
          .clip(aoi).updateMask(datandvi).rename('NDRE_Class');
  var overlay = (class_ndvi.add(class_ndmi).add(class_ndre)).rename('Overlay');
  var class_CropHealth = ee.Image(1)
          .where(overlay.lt(5), 0)
          .where(overlay.gte(6).and(overlay.lt(8)), 1)
          .where(overlay.gte(8),2)
          .clip(aoi).updateMask(Cropland).rename('CHI_Class');
  return img.addBands(overlay).addBands(class_CropHealth);
};
var indicesNormal = function(img){
  //RASTER NORMALIZATION
  var datasetWC = ee.ImageCollection('ESA/WorldCover/v200').first().select('Map').clip(aoi);
  var Cropland = datasetWC.eq(40).selfMask();
  var chi_normal = img.expression('((a - b) / (c - b)) * 100 ',{
    'a':img.select('Overlay'),
    'b':ee.Number(img.select('Overlay').reduceRegion(ee.Reducer.min(), aoi, 500).get('Overlay')),
    'c':ee.Number(img.select('Overlay').reduceRegion(ee.Reducer.max(), aoi, 500).get('Overlay')),    
  }).toFloat().rename('CHI').updateMask(Cropland);
    return img.addBands(chi_normal) 
};


//DATASET
var dataset = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED').filterBounds(aoi)
                  .filterDate(start, end)
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 30))
                  .map(maskS2clouds)
                  .map(indicesInput)
                  .map(indicesClass)
                  .map(indicesNormal)
                  .median()
                  .clip(aoi);

Map.centerObject(aoi,10);
Map.addLayer(aoi.style(symbology),{},'Batas Adm');
Map.addLayer(dataset,rgbVis,'RGB',false);
Map.addLayer(dataset.select('CHI'), {min:0,max:100,palette:['red','orange','yellow','5ced73','green']}, 'Crop Health',false);
Map.addLayer(dataset.select('CHI_Class'), {min:0,max:2,palette:['red','yellow','green']}, 'Crop Health Class');

  //LUASAN
var Area = ee.Image.pixelArea().divide(100*100).addBands(dataset.select('CHI_Class'))
  .reduceRegion({
    reducer: ee.Reducer.sum().group({
      groupField: 1,
      groupName: 'code',
    }),
    geometry: aoi,
    scale:100,
    bestEffort:true,
    maxPixels:1e9 
  }).get('CHI_Class');
  
var area_chart = ui.Chart.image.byClass({
  image: ee.Image.pixelArea().divide(1e4).addBands(dataset.select('CHI_Class')) , 
  classBand: 'CHI_Class' , 
  region: aoi, 
  reducer: ee.Reducer.sum(), 
  scale: 100, 
  classLabels:['Poor','Moderate','Good']
  })//.setSeriesNames(ee.List(['Tidak Ada','Ringan','Sedang', 'Kuat','Ekstrem']))
  .setOptions({title: 'Area Class',vAxis: {title: 'Area (Ha)'},colors: ['red','yellow','green']});
chartPanel2.add(area_chart)

//CHART LUASAN PER KECAMATAN
var KECIDN = IDNKEC.filter(ee.Filter.inList('NAME_2',[name]));
var luas1= dataset.select('CHI_Class').eq(0).multiply(ee.Image.pixelArea()).divide(10000).reduceRegions({
  collection: KECIDN,
  reducer: ee.Reducer.sum(),
  scale: 100,
  crs: 'EPSG:4326'
  });
var luas2 = dataset.select('CHI_Class').eq(1).multiply(ee.Image.pixelArea()).divide(10000).reduceRegions({
  collection: KECIDN,
  reducer: ee.Reducer.sum(),
  scale: 100,
  crs: 'EPSG:4326'
  });
var luas3 = dataset.select('CHI_Class').eq(2).multiply(ee.Image.pixelArea()).divide(10000).reduceRegions({
  collection: KECIDN,
  reducer: ee.Reducer.sum(),
  scale: 100,
  crs: 'EPSG:4326'
  });
var gabungData = luas1.map(function(feature){
var kecamatan = feature.get('NAME_3');
var luas1= ee.Number(feature.get('sum'));
var luas2_2 = ee.Number(luas2.filter(ee.Filter.eq('NAME_3', kecamatan)).first().get('sum'));
var luas3_3 = ee.Number(luas3.filter(ee.Filter.eq('NAME_3', kecamatan)).first().get('sum'));
  return ee.Feature(null, {
    'NAME_3': kecamatan,
    'Poor': luas1,
    'Moderate': luas2_2,
    'Good': luas3_3,
    });
  });
var AreaChartKec = ui.Chart.feature.byFeature({
  features: gabungData,
  xProperty: 'NAME_3',
  yProperties: ['Poor','Moderate','Good']
  }).setChartType('ColumnChart')
  .setOptions({
    title: 'Area Class per District',
    hAxis: {title: 'District'},
    vAxis: {title: 'Area (Ha)'},
    series: {
    0: {color: 'red', label: 'Poor'},
    1: {color: 'yellow', label: 'Moderate'},
    2: {color: 'green', label: 'Good'},
  },
  });
chartPanel2.add(AreaChartKec)

//LEGEND
var panel = ui.Panel({
  style: {position: 'bottom-left',padding: '5px;'}
});
var title = ui.Label({
  value: 'Crop Health',
  style: {
    fontWeight: 'bold',
    fontSize: '13px',
    margin: '100px;'
  }
});
panel.add(title);
var color = ['red','yellow','green'];
var lc_class = ['Poor','Moderate','Good'];
var list_legend = function(color, description) {
  var c = ui.Label({
    style: {
      backgroundColor: color,
      padding: '10px',
      margin: '4px'
    }
  })
  var ds = ui.Label({
    value: description,
    style: {
      margin: '5px',
      fontSize: '12px',
    }
  })
  return ui.Panel({
    widgets: [c, ds],
    layout: ui.Panel.Layout.Flow('horizontal'),
  })
}
for(var a = 0; a < 3; a++){
  panel.add(list_legend(color[a], lc_class[a]))
}
legend3.clear();
legendPanel.clear();
legendPanel.add(panel);
Map.add(legendPanel)
inspectPanel.clear();
inspectPanel2.clear();
chartPanel.clear();
koordPanel.clear();

//INSPECT
//Define callback function
var lon = ui.Label();
var lat = ui.Label();
function showValue7(value7) {
  var judulLabel7 = ui.Label({
    value: 'Crop Health Value',
    style: {
      fontWeight: 'bold',
    }
  });
  var valueLabel7 = ui.Label(value7);

  inspectPanel.clear();
  inspectPanel2.clear();
  inspectPanel.add(judulLabel7);
  inspectPanel.add(valueLabel7);
}

function inspect7(coords) {
 inspectPanel.clear();
 inspectPanel2.clear();
  var start = startDate.getValue();
  var end = endDate.getValue();
  var name = cityText.getValue();
  var aoi = IDNKAB.filter(ee.Filter.inList('NAME_2',[name]));
//-------------------------------------------------------
                      //CALCULATING CHI - ADDED TO THIS FUNCTION TO AVOID ERROR
//------------------------------------------------------- 
  //SENTINEL-2
function maskS2clouds(image) { 
  var ESAWC = ee.ImageCollection('ESA/WorldCover/v200').first().select('Map');
  var Crop = ESAWC.eq(40).selfMask();   
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  var gabungdata = image.addBands(ESAWC);
  var qa = gabungdata.select('QA60');
  var LC = gabungdata.select('Map');
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0)).or(LC.eq(40));
  return image.updateMask(mask).divide(10000).copyProperties(image, ['system:time_start']);
}
  //FUNCTION OF SPECTRAL INDICES   
var indicesInput = function(img){
  // NDVI
  var ndvi = img.normalizedDifference(['B8','B4']).rename('NDVI');
  //NDMI
  var ndmi = img.normalizedDifference(['B8','B11']).rename('NDMI');
  //NDRE
  var ndre = img.normalizedDifference(['B8','B5']).rename('NDRE');
  return img.addBands(ndvi).addBands(ndmi).addBands(ndre);
};

var indicesClass = function(img){
  var datasetWC = ee.ImageCollection('ESA/WorldCover/v200').first().select('Map').clip(aoi);
  var Cropland = datasetWC.eq(40).selfMask();
  var datandvi = img.select('NDVI').updateMask(Cropland);
  var datandmi = img.select('NDMI').updateMask(Cropland);
  var datandre = img.select('NDRE').updateMask(Cropland);
  var class_ndvi = ee.Image(1)
          .where(datandvi.lt(0.22), 1)
          .where(datandvi.gte(0.22).and(datandvi.lt(0.42)), 2)
          .where(datandvi.gte(0.42).and(datandvi.lt(0.72)), 3)
          .where(datandvi.gte(0.72),4)
          .clip(aoi).updateMask(datandvi).rename('NDVI_Class');
  var class_ndmi = ee.Image(1)
          .where(datandmi.lt(0), 1)
          .where(datandmi.gte(0).and(datandmi.lt(0.2)), 2)
          .where(datandmi.gte(0.2).and(datandmi.lt(0.4)), 3)
          .where(datandmi.gte(0.4),4)
          .clip(aoi).updateMask(datandvi).rename('NDMI_Class');
  var class_ndre = ee.Image(1)
          .where(datandre.lt(0.2), 1)
          .where(datandre.gte(0.2).and(datandre.lt(0.4)), 2)
          .where(datandre.gte(0.4).and(datandre.lt(0.6)), 3)
          .where(datandre.gte(0.6),4)
          .clip(aoi).updateMask(datandvi).rename('NDRE_Class');
  var overlay = (class_ndvi.add(class_ndmi).add(class_ndre)).rename('Overlay');
  var class_CropHealth = ee.Image(1)
          .where(overlay.lt(5), 0)
          .where(overlay.gte(6).and(overlay.lt(8)), 1)
          .where(overlay.gte(8),2)
          .clip(aoi).updateMask(Cropland).rename('CHI_Class');
  return img.addBands(overlay).addBands(class_CropHealth);
};
var indicesNormal = function(img){
  //RASTER NORMALIZATION
  var datasetWC = ee.ImageCollection('ESA/WorldCover/v200').first().select('Map').clip(aoi);
  var Cropland = datasetWC.eq(40).selfMask();
  var chi_normal = img.expression('((a - b) / (c - b)) * 100 ',{
    'a':img.select('Overlay'),
    'b':ee.Number(img.select('Overlay').reduceRegion(ee.Reducer.min(), aoi, 500).get('Overlay')),
    'c':ee.Number(img.select('Overlay').reduceRegion(ee.Reducer.max(), aoi, 500).get('Overlay')),    
  }).toFloat().rename('CHI').updateMask(Cropland);
    return img.addBands(chi_normal) 
};


//DATASET
var imageCHI = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED').filterBounds(aoi)
                  .filterDate(start, end)
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 30))
                  .map(maskS2clouds)
                  .map(indicesInput)
                  .map(indicesClass)
                  .map(indicesNormal)
                  .median()
                  .clip(aoi);
  
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var konsentrat = imageCHI.select('CHI').reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: point,
    scale: 10
  }).get('CHI');
  konsentrat.evaluate(showValue7);
  
  //CHART
var imagechartCHI = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED').filterBounds(aoi)
                  .filterDate(start, end)
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 30))
                  .map(maskS2clouds)
                  .map(indicesInput)
                  .map(indicesClass)
                  .map(indicesNormal);
  lon.setValue('Lat.: ' + coords.lon.toFixed(5)),
  lat.setValue('Long.: ' + coords.lat.toFixed(5));
  var point2 = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point);
  //Map.layers().set(1, dot);
  chartPanel.clear();
    var chartz = ui.Chart.image.seriesByRegion({
      imageCollection: imagechartCHI,
      regions: point,
      reducer: ee.Reducer.mean(),
      band: 'CHI',
      scale: 1000,
      xProperty: 'system:time_start'
    }).setSeriesNames(['Value']).setChartType('LineChart');
      chartz.setOptions({
      title: 'Crop Health Chart',
      trendlines: {0:{showR2:true,visibleInLegend:true}}
  });
chartPanel.add(chartz);
}
koordPanel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
Map.onClick(inspect7);
}//END OF CROP HEALTH



//----------------------------------------------------
                   //DROUGHT SEVERITY
//------------------------------------------------------
function MulaiKBDI(){
  Map.layers().reset();
  luasPanel.clear();
  chartPanel.clear();
  chartPanel2.clear();
  inspectPanel.clear();
  
  var start = startDate.getValue();
  var end = endDate.getValue();
  var name = cityText.getValue();
  var aoi = IDNKAB.filter(ee.Filter.inList('NAME_2',[name]));

//dataset
  var collection = ee.ImageCollection('UTOKYO/WTLAB/KBDI/v1').filterBounds(aoi)
  .select('KBDI')
  .filterDate(start, end)
  .mean()
  .clip(aoi);

var bandViz = {
  min: 0,
  max: 500,
  palette: ['001a4d', '003cb3', '80aaff', '336600', 'cccc00', 'cc9900', 'cc6600','660033']
};

Map.centerObject(aoi,10);
Map.addLayer(aoi.style(symbology),{},'Batas Adm');
Map.addLayer(collection, bandViz, 'Keetch-Byram Drought Index');

//KBDI MEAN PER DISTRICT
var aoiKec = IDNKEC.filter(ee.Filter.inList('NAME_2',[name]));
function getMeanKBDI(feature) {
  var KBDImean = collection.reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: feature.geometry(),
    scale: 4000
  }).get('KBDI');
  return feature.set({'KBDI': KBDImean,});
}
var district_meanKBDI = aoiKec.map(getMeanKBDI);
var chartMeanKBDI = ui.Chart.feature.byFeature({
  features: district_meanKBDI,
  xProperty: 'NAME_3',
  yProperties: ['KBDI']
}).setOptions({
  title: 'Mean Drought Severity per District',
  hAxis: {title: 'District'},
  vAxis: {title: 'KBDI Value'},
  series: {0: {color: 'cc6600', label: 'KBDI'},},
  legend: {position: 'bottom'}
}).setChartType('ColumnChart');
chartPanel2.add(chartMeanKBDI)

//KBDI Class
var class_kbdi = ee.Image(1)
        .where(collection.lt(150), 0)
        .where(collection.gte(150).and(collection.lt(300)), 1)
        .where(collection.gte(300).and(collection.lt(500)), 2)
        .where(collection.gte(300).and(collection.lt(500)), 3)
        .where(collection.gte(500).and(collection.lt(700)), 4)
        .where(collection.gte(700),5)
        .clip(aoi);
//Map.addLayer(class_kbdi, {min:0,max:5,palette:['80aaff', '336600', 'cccc00', 'cc9900', 'cc6600','660033']}, 'KBDI Class');

    //legenda
var legendTitle = ui.Label({
  value: 'Drought Severity',
  style: {
    fontWeight: 'bold',
    fontSize: '15px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
var long = ee.Image.pixelLonLat().select('latitude');
var gradient = long;
var legendImage = gradient.visualize(bandViz);
var panelmin = ui.Panel({
    widgets: [ui.Label(bandViz['min'])
    ],
});
var thumbnail = ui.Thumbnail ({
  image: legendImage,
  params: {bbox:'0,0,50,590', dimensions: '10x150'},
  style: {padding: '1px', position: 'bottom-center'}
});
var panelmax = ui.Panel({
    widgets: [ui.Label(bandViz['max'])
    ],
});
legend3.clear();
legend3.add(legendTitle);
legend3.add(panelmax);
legend3.add(thumbnail);
legend3.add(panelmin);
inspectPanel.clear();
inspectPanel2.clear();
chartPanel.clear();
koordPanel.clear();
//INSPECT
//Define callback function
var lon = ui.Label();
var lat = ui.Label();
function showValue8(value8) {
  var judulLabel8 = ui.Label({
    value: 'KBDI Value',
    style: {
      fontWeight: 'bold',
    }
  });
  var valueLabel8 = ui.Label(value8);

  inspectPanel.clear();
  inspectPanel.add(judulLabel8);
  inspectPanel.add(valueLabel8);
}
//
function inspect8(coords) {
  inspectPanel.clear();
  inspectPanel2.clear();
  chartPanel.clear();
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var konsentrat = collection.reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: point,
    scale: 4000
  }).get('KBDI');

  konsentrat.evaluate(showValue8);
  //CHART
  var colChart = ee.ImageCollection('UTOKYO/WTLAB/KBDI/v1').filterBounds(aoi)
  .select('KBDI')
  .filterDate(start, end);
  lon.setValue('Lat.: ' + coords.lon.toFixed(5)),
  lat.setValue('Long.: ' + coords.lat.toFixed(5));
  var point2 = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point2);
  //Map.layers().set(1, dot);
  chartPanel.clear();
  var kbdiChart = ui.Chart.image.series(colChart, point, ee.Reducer.mean(), 4000).setSeriesNames(['KBDI'])
  .setOptions({
      title: 'Drought Severity Chart',
      trendlines: {0:{showR2:true,visibleInLegend:true}}
  });
  chartPanel.add(kbdiChart);
}
koordPanel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
Map.onClick(inspect8);
Map.add(legend3);
} //END OF KBDI FUNCTION

//----------------------------------------------------
                //SOIL MOISTURE FROM LANDSAT
//----------------------------------------------------
function MulaiSMI(){
  Map.layers().reset();
  luasPanel.clear();
  chartPanel.clear();
  chartPanel2.clear();
  inspectPanel.clear();
  
  var start = startDate.getValue();
  var end = endDate.getValue();
  var name = cityText.getValue();
  var aoi = IDNKAB.filter(ee.Filter.inList('NAME_2',[name]));
//-------------------------------------------------------
                      //CALCULATING SMI
//------------------------------------------------------- 
// Applies cloud mask
function cloudMaskforCrop(image) {
  var ESAWC = ee.ImageCollection('ESA/WorldCover/v200').first().select('Map');
  var Crop = ESAWC.eq(40).selfMask();   
  var cloudShadowBitmask = (1 << 3);
  var cloudBitmask = (1 << 5);
  var gabungdata = image.addBands(ESAWC);
  var qa = gabungdata.select('QA_PIXEL');
  var LC = gabungdata.select('Map');
  var mask = qa.bitwiseAnd(cloudShadowBitmask).eq(0)
                .and(qa.bitwiseAnd(cloudBitmask).eq(0)).or(LC.eq(40));
  
  return image.updateMask(mask);
}
  //FUNCTION OF SPECTRAL INDICES   
var indicesSMI = function(img){
  var thermal = img.select('B10');
  var thermal_max = ee.Number(img.select('B10').reduceRegion(ee.Reducer.max(), aoi, 30).get('B10'));
  var thermal_min = ee.Number(img.select('B10').reduceRegion(ee.Reducer.min(), aoi, 30).get('B10'));
  //SMI
  var SMI = img.expression(
  '(a - LST)/(a - b)', {'a': thermal_max,
  'LST': img.select('B10'),
  'b': thermal_min,
  }).rename('SMI');
  return img.addBands(SMI);
};

//-------------------------------------------------------
                      //DATASETS
//-------------------------------------------------------

var dataset2 = ee.ImageCollection('LANDSAT/LC08/C02/T1_TOA')
    .filterBounds(aoi)
    .filterDate(start, end)
    .filterMetadata('CLOUD_COVER', 'less_than', 30)
    .map(cloudMaskforCrop)
    .map(indicesSMI)
    .median()
    .clip(aoi);

//ESA WC CROPLAND MASKING
var datasetWC = ee.ImageCollection('ESA/WorldCover/v200').first().select('Map').clip(aoi);
var Cropland = datasetWC.eq(40).selfMask();
var VegSMI = dataset2.select('SMI').updateMask(Cropland);

//CLASSIFICATION OF SMI          
var Kelas = ee.Image(1)
          .where(VegSMI.lt(0.2), 0)
          .where(VegSMI.gte(0.2).and(VegSMI.lt(0.3)), 1)
          .where(VegSMI.gte(0.3).and(VegSMI.lt(0.5)), 2)
          .where(VegSMI.gte(0.5),3)
          .clip(aoi).updateMask(VegSMI);

Map.centerObject(aoi,10);
Map.addLayer(aoi.style(symbology),{},'Batas Adm');
Map.addLayer(dataset2,visTOA,'RGB',false);
Map.addLayer(dataset2,visFalseTOA,'False Color',false);
//Map.addLayer(Cropland)
Map.addLayer(VegSMI, {min:0,max:1,palette:['001a4d', '003cb3', '80aaff', '336600', 'cccc00', 'cc9900', 'cc6600','660033']}, 'Soil Moisture',false);
Map.addLayer(Kelas, {min:0,max:3,palette:['660033','cc6600','80aaff','003cb3']}, 'Soil Moisture Class');

  //LUASAN
var Area = ee.Image.pixelArea().divide(100*100).addBands(Kelas)
  .reduceRegion({
    reducer: ee.Reducer.sum().group({
      groupField: 1,
      groupName: 'code',
    }),
    geometry: aoi,
    scale:100,
    bestEffort:true,
    maxPixels:1e9 
  }).get('groups');
  
var area_chart = ui.Chart.image.byClass({
  image: ee.Image.pixelArea().divide(1e4).addBands(Kelas) , 
  classBand: 'constant' , 
  region: aoi, 
  reducer: ee.Reducer.sum(), 
  scale: 30, 
  classLabels:['Very dry','Dry','Wet', 'Very Wet']
  })//.setSeriesNames(ee.List(['Tidak Ada','Ringan','Sedang', 'Kuat','Ekstrem']))
  .setOptions({title: 'Area Class',vAxis: {title: 'Area (Ha)'},colors: ['660033','cc6600','80aaff','003cb3']});
chartPanel2.add(area_chart)

//CHART LUASAN PER KECAMATAN
var KECIDN = IDNKEC.filter(ee.Filter.inList('NAME_2',[name]));
var luas1= Kelas.eq(0).multiply(ee.Image.pixelArea()).divide(10000).reduceRegions({
  collection: KECIDN,
  reducer: ee.Reducer.sum(),
  scale: 30,
  crs: 'EPSG:4326'
  });
var luas2 = Kelas.eq(1).multiply(ee.Image.pixelArea()).divide(10000).reduceRegions({
  collection: KECIDN,
  reducer: ee.Reducer.sum(),
  scale: 30,
  crs: 'EPSG:4326'
  });
var luas3 = Kelas.eq(2).multiply(ee.Image.pixelArea()).divide(10000).reduceRegions({
  collection: KECIDN,
  reducer: ee.Reducer.sum(),
  scale: 30,
  crs: 'EPSG:4326'
  });
var luas4 = Kelas.eq(3).multiply(ee.Image.pixelArea()).divide(10000).reduceRegions({
  collection: KECIDN,
  reducer: ee.Reducer.sum(),
  scale: 30,
  crs: 'EPSG:4326'
  });
var gabungData = luas1.map(function(feature){
var kecamatan = feature.get('NAME_3');
var luas1= ee.Number(feature.get('sum'));
var luas2_2 = ee.Number(luas2.filter(ee.Filter.eq('NAME_3', kecamatan)).first().get('sum'));
var luas3_3 = ee.Number(luas3.filter(ee.Filter.eq('NAME_3', kecamatan)).first().get('sum'));
var luas4_4 = ee.Number(luas4.filter(ee.Filter.eq('NAME_3', kecamatan)).first().get('sum'));
  return ee.Feature(null, {
    'NAME_3': kecamatan,
    'Very dry': luas1,
    'Dry': luas2_2,
    'Wet': luas3_3,
    'Very Wet': luas4_4,
    });
  });
var AreaChartKec = ui.Chart.feature.byFeature({
  features: gabungData,
  xProperty: 'NAME_3',
  yProperties: ['Very dry','Dry','Wet', 'Very Wet']
  }).setChartType('ColumnChart')
  .setOptions({
    title: 'Area Class per District',
    hAxis: {title: 'District'},
    vAxis: {title: 'Area (Ha)'},
    series: {
    0: {color: '660033', label: 'Very dry'}, 
    1: {color: 'cc6600', label: 'Dry'},
    2: {color: '80aaff', label: 'Wet'},
    3: {color: '003cb3', label: 'Very Wet'},
  },
  });
chartPanel2.add(AreaChartKec)

//LEGEND
var panel = ui.Panel({
  style: {position: 'bottom-left',padding: '5px;'}
});
var title = ui.Label({
  value: 'Soil Moisture',
  style: {
    fontWeight: 'bold',
    fontSize: '13px',
    margin: '100px;'
  }
});
panel.add(title);
var color = ['660033','cc6600','80aaff','003cb3'];
var lc_class = ['Very dry','Dry','Wet', 'Very Wet'];
var list_legend = function(color, description) {
  var c = ui.Label({
    style: {
      backgroundColor: color,
      padding: '10px',
      margin: '4px'
    }
  })
  var ds = ui.Label({
    value: description,
    style: {
      margin: '5px',
      fontSize: '12px',
    }
  })
  return ui.Panel({
    widgets: [c, ds],
    layout: ui.Panel.Layout.Flow('horizontal'),
  })
}
for(var a = 0; a < 4; a++){
  panel.add(list_legend(color[a], lc_class[a]))
}
legend3.clear();
legendPanel.clear();
legendPanel.add(panel);
Map.add(legendPanel)
inspectPanel.clear();
inspectPanel2.clear();
chartPanel.clear();
koordPanel.clear();

//INSPECT
//Define callback function
var lon = ui.Label();
var lat = ui.Label();
function showValue7(value7) {
  var judulLabel7 = ui.Label({
    value: 'Soil Moisture Value',
    style: {
      fontWeight: 'bold',
    }
  });
  var valueLabel7 = ui.Label(value7);

  inspectPanel.clear();
  inspectPanel2.clear();
  inspectPanel.add(judulLabel7);
  inspectPanel.add(valueLabel7);
}
//
function inspect7(coords) {
 inspectPanel.clear();
 inspectPanel2.clear();
  var start = startDate.getValue();
  var end = endDate.getValue();
  var name = cityText.getValue();
  var aoi = IDNKAB.filter(ee.Filter.inList('NAME_2',[name]));
//-------------------------------------------------------
                      //CALCULATING SMI - ADDED TO THIS FUNCTION TO AVOID ERROR
//------------------------------------------------------- 
// Applies cloud mask
function cloudMaskforCrop(image) {
  var ESAWC = ee.ImageCollection('ESA/WorldCover/v200').first().select('Map');
  var Crop = ESAWC.eq(40).selfMask();   
  var cloudShadowBitmask = (1 << 3);
  var cloudBitmask = (1 << 5);
  var gabungdata = image.addBands(ESAWC);
  var qa = gabungdata.select('QA_PIXEL');
  var LC = gabungdata.select('Map');
  var mask = qa.bitwiseAnd(cloudShadowBitmask).eq(0)
                .and(qa.bitwiseAnd(cloudBitmask).eq(0)).or(LC.eq(40));
  
  return image.updateMask(mask);
}
  //FUNCTION OF SPECTRAL INDICES   
var indicesSMI = function(img){
  var thermal = img.select('B10');
  var thermal_max = ee.Number(img.select('B10').reduceRegion(ee.Reducer.max(), aoi, 30).get('B10'));
  var thermal_min = ee.Number(img.select('B10').reduceRegion(ee.Reducer.min(), aoi, 30).get('B10'));
  //SMI
  var SMI = img.expression(
  '(a - LST)/(a - b)', {'a': thermal_max,
  'LST': img.select('B10'),
  'b': thermal_min,
  }).rename('SMI');
  return img.addBands(SMI);
};

//-------------------------------------------------------
                      //DATASETS
//-------------------------------------------------------
var imageSMI = ee.ImageCollection('LANDSAT/LC08/C02/T1_TOA')
    .filterBounds(aoi)
    .filterDate(start, end)
    .filterMetadata('CLOUD_COVER', 'less_than', 30)
    .map(cloudMaskforCrop)
    .map(indicesSMI)
    .median()
    .clip(aoi);

//ESA WC CROPLAND MASKING
var datasetWC = ee.ImageCollection('ESA/WorldCover/v200').first().select('Map').clip(aoi);
var Cropland = datasetWC.eq(40).selfMask();
  
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var konsentrat = imageSMI.select('SMI').updateMask(Cropland).reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: point,
    scale: 30
  }).get('SMI');
  konsentrat.evaluate(showValue7);
  
  //CHART
var imageChartSMI = ee.ImageCollection('LANDSAT/LC08/C02/T1_TOA')
    .filterBounds(aoi)
    .filterDate('2023-01-01', end)
    .filterMetadata('CLOUD_COVER', 'less_than', 30)
    .map(cloudMaskforCrop)
    .map(indicesSMI);
  lon.setValue('Lat.: ' + coords.lon.toFixed(5)),
  lat.setValue('Long.: ' + coords.lat.toFixed(5));
  var point2 = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point);
  //Map.layers().set(1, dot);
  chartPanel.clear();
    var chartz = ui.Chart.image.seriesByRegion({
      imageCollection: imageChartSMI,
      regions: point,
      reducer: ee.Reducer.mean(),
      band: 'SMI',
      scale: 30,
      xProperty: 'system:time_start'
    }).setSeriesNames(['SMI']).setChartType('LineChart');
      chartz.setOptions({
      title: 'Soil Moisture Chart',
      trendlines: {0:{showR2:true,visibleInLegend:true}}
  });
chartPanel.add(chartz);
}
koordPanel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
Map.onClick(inspect7);
} //END OF SMI FUNCTION





//RELATIVE HUMIDITY
function MulaiRH(){
  Map.layers().reset();
  var start = startDate.getValue();
  var end = endDate.getValue();
  
var palettes = require('users/gena/packages:palettes');
var palette = palettes.colorbrewer.Blues[7];
var image = ee.Image("NASA/FLDAS/NOAH01/C/GL/M/V001/202305")
var dataset = ee.ImageCollection('NASA/FLDAS/NOAH01/C/GL/M/V001').filterBounds(aoi)
              .filter(ee.Filter.date('2018-11-01', '2018-12-01'))
              .mean()
              .clip(aoi);
// Relative Humidity visualisation
var visRH = {
  min: 60,
  max: 90,
  palette: ['a50026', 'd73027', 'f46d43', 'fdae61', 'fee090', 
  'e0f3f8', 'abd9e9', '74add1', '4575b4', '313695'],
};

var relativeHumidity = dataset.expression(
  '0.263 * p * q * (exp(17.67 * (T - T0) / (T - 29.65))) ** -1', {
    T: dataset.select('Tair_f_tavg'),
    T0: 273.16,
    p: dataset.select('Psurf_f_tavg'),
    q: dataset.select('Qair_f_tavg')
  }
).float();
var clip = relativeHumidity.clip(aoi);
Map.addLayer(relativeHumidity, visRH, 'relativeHumidity');
    //legenda
var legendTitle = ui.Label({
  value: 'Kelembaban Relatif (%)',
  style: {
    fontWeight: 'bold',
    fontSize: '15px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
var long = ee.Image.pixelLonLat().select('latitude');
var gradient = long;
var legendImage = gradient.visualize(visRH);
var panelmin = ui.Panel({
    widgets: [ui.Label(visRH['min'])
    ],
});
var thumbnail = ui.Thumbnail ({
  image: legendImage,
  params: {bbox:'0,0,50,150', dimensions: '10x150'},
  style: {padding: '1px', position: 'bottom-center'}
});
var panelmax = ui.Panel({
    widgets: [ui.Label(visRH['max'])
    ],
});
legend3.clear();
legend3.add(legendTitle);
legend3.add(panelmax);
legend3.add(thumbnail);
legend3.add(panelmin);
inspectPanel.clear();
chartPanel.clear();
koordPanel.clear();
//INSPECT
//Define callback function
var lon = ui.Label();
var lat = ui.Label();
function showValue8(value8) {
  var judulLabel8 = ui.Label({
    value: 'Kelembaban Relatif (%)',
    style: {
      fontWeight: 'bold',
    }
  });
  var valueLabel8 = ui.Label(value8);

  inspectPanel.clear();
  inspectPanel.add(judulLabel8);
  inspectPanel.add(valueLabel8);
}
//
function inspect8(coords) {
  inspectPanel.clear();
  chartPanel.clear();
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var konsentrat = relativeHumidity.reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: point,
    scale: 11132
  }).get('constant');

  konsentrat.evaluate(showValue8);
  //CHART
  lon.setValue('G. Lintang: ' + coords.lon.toFixed(5)),
  lat.setValue('G. Bujur: ' + coords.lat.toFixed(5));
  var point2 = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point2);
  Map.layers().set(1, dot);
  chartPanel.clear();
  chartPanel.add(noChart);
}
koordPanel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
Map.onClick(inspect8);
}
//



//Map.add(inspectPanel);

mainPanel.add(ketLabel);
mainPanel.add(koordPanel);
mainPanel.add(inspectPanel);
mainPanel.add(inspectPanel2);
//mainPanel.add(chartLabel);
mainPanel.add(chartPanel);
mainPanel.add(chartPanel2)
 
