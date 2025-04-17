import React, { useEffect, useRef } from 'react';
import { Edit, Canvas, Controls } from '@shotstack/shotstack-studio';
import './App.css';

import template from './template.json';

function App() {
  const canvasContainerRef = useRef(null);

  useEffect(() => {
    const initShotstack = async () => {
      try {
        // 1. Retrieve an edit from a template
        const templateUrl =
          'https://shotstack-assets.s3.amazonaws.com/templates/hello-world/hello.json';
        const response = await fetch(templateUrl);
        const template = await response.json();

        // 2. Initialize the edit with dimensions and background color
        const edit = new Edit(
          template.output.size,
          template.timeline.background
        );
        await edit.load();

        // 3. Create a canvas to display the edit
        const canvas = new Canvas(template.output.size, edit);
        await canvas.load(); // Renders to [data-shotstack-studio] element

        // 4. Load the template
        await edit.loadEdit(template);

        // 5. Add keyboard controls
        const controls = new Controls(edit);
        await controls.load();

        // 6. Control playback with playback methods
        await edit.play();

        // Additional helpful information for the demo
        console.log(
          'Demo loaded successfully! Try the following keyboard controls:'
        );
        console.log('- Space: Play/Pause');
        console.log('- J: Stop');
        console.log('- K: Pause');
        console.log('- L: Play');
        console.log('- Left/Right Arrow: Seek');
        console.log('- Shift+Left/Right: Seek faster');
        console.log('- Comma/Period: Step frame by frame');
      } catch (error) {
        console.error('Failed to initialize Shotstack:', error);
      }
    };

    initShotstack();
  }, []);

  return (
    <div className="App">
      <div
        data-shotstack-studio
        className="canvas-container"
        ref={canvasContainerRef}
      ></div>
    </div>
  );
}

export default App;
