import * as THREE from 'three';
import { settings } from './settings.js';

// W1, Task 4: My custom scene with scale cues
// 1. mine: Floating cyan metallic octahedron at (1.2, 1.3, -2.0)
// 2. Scale-cue object: A 0.5 m side-table with a 0.1 m ceramic coffee mug at (-0.9, 0, -1.8)
// 3. Point light: Warm soft highlight at (1.2, 2.4, -1.5)
export function addMyContent(scene) {
  const root = new THREE.Group();

  // 1. Customized 'mine': Floating metallic crystal octahedron
  const crystal = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.28, 0),
    new THREE.MeshStandardMaterial({
      color: 0x00e5ff,
      metalness: 0.65,
      roughness: 0.2,
    })
  );
  crystal.position.set(1.2, 1.3, -2.0);
  crystal.castShadow = true;
  crystal.receiveShadow = true;
  root.add(crystal);

  // 2. Scale cue: Standard height side table (0.5 m) + Coffee mug (0.1 m height)
  // 2a. Table (radius 0.22 m, height 0.5 m)
  const table = new THREE.Mesh(
    new THREE.CylinderGeometry(0.22, 0.24, 0.5, 24),
    new THREE.MeshStandardMaterial({
      color: 0x8d6e63,
      roughness: 0.7,
    })
  );
  table.position.set(-0.9, 0.25, -1.8);
  table.castShadow = true;
  table.receiveShadow = true;
  root.add(table);

  // 2b. Coffee mug (height 0.1 m, radius 0.045 m)
  const mugBody = new THREE.Mesh(
    new THREE.CylinderGeometry(0.045, 0.04, 0.1, 24),
    new THREE.MeshStandardMaterial({
      color: 0xf5f5f5,
      roughness: 0.25,
    })
  );
  mugBody.position.set(-0.9, 0.55, -1.8);
  mugBody.castShadow = true;
  mugBody.receiveShadow = true;
  root.add(mugBody);

  // Mug handle (torus 0.03 m radius)
  const mugHandle = new THREE.Mesh(
    new THREE.TorusGeometry(0.03, 0.008, 12, 24),
    new THREE.MeshStandardMaterial({
      color: 0xf5f5f5,
      roughness: 0.25,
    })
  );
  mugHandle.position.set(-0.85, 0.55, -1.8);
  mugHandle.rotation.y = Math.PI / 2;
  mugHandle.castShadow = true;
  mugHandle.receiveShadow = true;
  root.add(mugHandle);

  scene.add(root);

  // 3. Point light positioned to cast dynamic specular highlights
  const light = new THREE.PointLight(0xffeedd, 12, 7);
  light.position.set(1.2, 2.4, -1.5);
  scene.add(light);

  return {
    mine: root,
    update(t) {
      if (!settings.reducedMotion) {
        crystal.rotation.y = t * 0.8;
        crystal.rotation.x = Math.sin(t * 0.5) * 0.2;
        // gentle floating bob
        crystal.position.y = 1.3 + Math.sin(t * 1.5) * 0.05;
      }
    },
  };
}

