# SEM-Image-Formation
Browser-based interactive simulation for students to learn the working principle of SEM image formation

Link to simulation: https://emilykli.github.io/SEM-Image-Formation/

## Folder Explanations:
- assets: where all of the images for the simulation are stored
- libraries: standard p5 libraries, I did not edit these too much
- ui-components: where all of the code for displaying and running the simulation lives

## Files in ui-components:
- electrons.js: contains code for electron collisions with the surface and electron trajectories towards the secondary detector. Currently very repetitive and needs to be refactored to be more readable
- sampleSelect.js: contains code for drawing the selected sample
- resultingImage.js: contains code for filling in the pixels for the SEM's resulting image
- sketch.js: contains code for displaying elements in the simulation (biggest part of this website)

## To Be Implemented:
- [ ] Resizing window
- [ ] Refactoring electrons.js (especially code for collision with surface)
