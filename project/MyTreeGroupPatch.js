import {CGFappearance,CGFobject} from '../lib/CGF.js';
import { MyBillboard } from './MyBillboard.js';
/**
 * MyTreeGroupPatch
 * @constructor
 * @param {MyScene} scene - Reference to MyScene object
 */
export class MyTreeGroupPatch extends CGFobject {
	constructor(scene, x,y,z) {
		super(scene);

        this.x = x;
        this.y = y;
        this.z = z;

        this.trees = [];

        this.aggregate(this.x, this.y, this.z);
        this.display();
	}

    initMaterials(){
        this.billboardTexture = new CGFappearance(this.scene);
        this.billboardTexture.setEmission(1,1,1,1);
        this.billboardTexture.setShininess(20.0);
        this.billboardTexture.loadTexture('images/billboardtree.png');
        this.billboardTexture.setTextureWrap('REPEAT', 'REPEAT');
    }

    getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
    }

    aggregate(x,y,z){

        let offset;
        for (let i = 0; i < 3;i++){
            for (let j = 0; j < 3; j++){
                offset = this.getRandomIntInclusive(-0.9, 0.9);
                let tree = new MyBillboard(this.scene, 
                    x + i*1.5 + offset, y, z + j*1.5 + offset);
                this.trees.push(tree);
            }
        }
    
    }

    display(){
        
        for (let i = 0; i < this.trees.length; i++){
            this.trees[i].display();
        }
    }

	/**
	 * @method updateTexCoords
	 * Updates the list of texture coordinates of the quad
	 * @param {Array} coords - Array of texture coordinates
	 */
	updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}

    updateBuffers(){
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}
