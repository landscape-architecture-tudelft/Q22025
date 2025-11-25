# Landscape Technology Q2

## The Survey

### Schedule:

09:00 Meet at the Bouwpup with bikes   
09:15 Bike ride to Berkelse Zweth Bridge https://maps.app.goo.gl/FzxvnyDABhWpaGQp7   
09:45 Introduction to the landscape survey and drone flight    
10:30 3D scanning excercise   

13:45 Meet in the studio with your 3D scans   
14:00 Downloading and processing data   
16:00 Presentation of results   

**Assignment per student-team:**

Document at least 3 landscape elements that reveal the control systems and material culture in the polder landscape. 

Use the photogrammetry app **Luma 3D Capture** so we can collect all you scans in one place. Try also another app for comparison like Pix4DCatch, RealityScan, Polycam, or similar.

**Three Categories:**

1. Splats of Control Structures: sluices, culverts, overflows, level markers, drainage, irrigation, pump stations..    
2. Splats of Movement Structures: bridges, locks, paths, elevation changes, cattle grids..   
3. Splats of Boundary Structures: dikes, didges, hedgerows, gates..   

**Deliverables:**

At least 3 scans (one per category) using the LUMA app

---

## Apps

### Luma AI: 3D Capture

**Best for:** Gaussian splatting, AI-enhanced captures with automatic processing

**Downloads:**
- iOS: https://apps.apple.com/app/luma-ai/id1615849914
- Android: https://play.google.com/store/apps/details?id=ai.lumalabs.polar&pcampaignid=web_share

**How to scan:**
- Pan or circle your subject smoothly at different heights 
- Keep subject centered in frame
- Move at walking pace
- You can also record a video and upload to app

**Importing Data**

- Export from web interface, results may vary https://lumalabs.ai/dashboard/captures
- Exports available in OBJ (mesh) or PLY (point cloud). Also 360-degrees image.
- Note: Free tier has export limitations; paid plans offer higher quality

---

### Pix4Dscan

**Best for:** Structured, systematic outdoor scanning

**Download:**
- iOS: https://apps.apple.com/us/app/pix4dcatch-3d-scanner/id1511483044
- Android: https://play.google.com/store/apps/details?id=com.pix4dcatch

**How to scan:**
- Best for models to scale using lidar phones
- Maintain 70% overlap between photos
- Walk slowly and keep your phone steady
- Best lighting: overcast days

**Importing into Rhino**
- Trial version allows for exporting PLY data from the app directly (point cloud data), rhino can read this format.
- You can process your scan in PIX4Dcloud (desktop or web), but exporting is limited to the paid version. 

---

### RealityScan

**Best for:** Small to medium objects and architectural details

**Download:**
- iOS: https://apps.apple.com/app/realityscan/id1584832280
- Android: https://play.google.com/store/apps/details?id=com.epicgames.realityscan

**How to scan:**
- Follow the on-screen coverage indicator (aim for 100%)
- Capture from all angles including top and bottom
- Works best for objects up to 2-3 meters
- Best lighting: even, diffuse light

**Importing into Rhino**
- Export directly from app or via Sketchfab integration. 
- Formats: OBJ works well with Rhino.

---

### Polycam

**Best for:** Both small objects and larger landscape elements, versatile for field conditions

**Download:**
- iOS: https://apps.apple.com/app/polycam-3d-scanner/id1532482376
- Android: https://play.google.com/store/apps/details?id=ai.polycam

**How to scan:**
- Choose Photo Mode for best quality (LiDAR mode available on compatible iOS devices)
- Walk around object/structure capturing overlapping photos
- Aim for 50-100 photos depending on complexity
- Maintain consistent distance and overlap between shots
- Works well for both close-up details and larger structures (up to 10+ meters)
- Best lighting: overcast days or even shade (avoid harsh shadows and direct sunlight)

**Importing into Rhino:**
- In app: tap your scan → Share/Export → Export Model
- Choose OBJ format (includes textures)
- Free tier allows lower resolution exports; Polycam Pro unlocks full resolution
- Keep texture files in same folder as OBJ file when importing into Rhino

---

## Additional Resources

For a detailed step-by-step guide on photogrammetry techniques and best practices, check out the **[Photogrammetry Tutorial](photogrammetry.md)** or view it directly on the site: [Photogrammetry Tutorial](?page=photogrammetry).
