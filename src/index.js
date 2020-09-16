import * as Tone from "tone";

let sounds = ['/assets/sounds/kick.wav',
              '/assets/sounds/close.wav',
              '/assets/sounds/open.wav',
              '/assets/sounds/snare.wav'];

window.onload = () => {
    //サンプラ初期化
    const sampler = new Tone.Sampler({
        urls: {
            'C1': sounds[0],
            'E1': sounds[1],
            'F#1': sounds[2],
            'F1': sounds[3]
        },}).toDestination();
    
    let volume = 0;
    sampler.volume.value = volume;
    console.log("サンプラー内容確認");
    console.log(sampler);
    console.log(sampler.urls)



    //ファイル変更時処理
    const sound = document.getElementById('sound1');
    sound.onchange = () =>{
        const file = sound.files[0]
        sounds[0] = file;
        console.log(file);
        console.log(sound.files[0]);   
        console.log(sampler);     
        console.log(sampler.samples);
        console.log(sampler.urls); 
    }

    //音声再生,アニメーション適用
    const play = note => {
        const cell = document.querySelector('[data-note="' + note + '"]');
        sampler.triggerAttackRelease(note, .3);
        cell.style.animationName = 'fade';
        setTimeout(() => {
            cell.style.animationName = '';
        }, 300)
    }
    //クリック時再生処理
    const beatbox = document.getElementById('buttons');
    beatbox.querySelectorAll('div').forEach(div=>{
		div.onclick = e => {
			play(e.currentTarget.dataset.note)
		};
	});

    //キーボード押下時処理
    document.onkeypress = e => {
        if (e.code === 'KeyD') {
            play('C1');
            console.log(sounds[0]);
            console.log(sampler);
            console.log(sampler.urls);
        } else if (e.code === 'KeyF') {
            play('E1');
            console.log("close");
        } else if (e.code === 'KeyJ') {
            play('F#1')
            console.log("open");
        } else if (e.code === 'KeyK') {
            play('F1')
            console.log("snare");
        }
    }
};