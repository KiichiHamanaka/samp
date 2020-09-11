//create a synth and connect it to the main output (your speakers)
import * as Tone from "tone";

window.onload = () => {

    const sampler = new Tone.Sampler({
        'C1': '/assets/kick.wav',
        'E1': '/assets/close.wav',
        'F#1': '/assets/open.wav',
        'F1': '/assets/snare.wav'
    }, () => {
        console.log('initialized')
    }).toDestination();

    //play a middle 'C' for the duration of an 8th note
    const sound = note => {
        const cell = document.querySelector('[data-note="' + note + '"]');
        sampler.triggerAttackRelease(note, .3);
        cell.style.animationName = 'fade';
        setTimeout(() => {
            cell.style.animationName = '';
        }, 300)
    }
    const beatbox = document.getElementById('buttons');
    beatbox.querySelectorAll('div').forEach(div=>{
		div.onclick = e => {
			sound(e.currentTarget.dataset.note)
		};
	});

    /*
    beatbox.querySelectorAll('div').forEach(div=>{
        div.onclick = e => {
            sound(e.currentTarget.dataset.note)
        };
    });
    */

    document.onkeypress = e => {
        if (e.code === 'KeyD') {
            sound('C1');
            console.log("Kick");
        } else if (e.code === 'KeyF') {
            sound('E1');
            console.log("close");
        } else if (e.code === 'KeyJ') {
            sound('F#1')
            console.log("open");
        } else if (e.code === 'KeyK') {
            sound('F1')
            console.log("snare");
        }
    }
};