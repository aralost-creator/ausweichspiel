// Steuerung
input.onButtonPressed(Button.A, function () {
    if (spielerX > 0) {
        led.unplot(spielerX, 4)
        spielerX += -1
        led.plot(spielerX, 4)
    }
})
input.onButtonEvent(Button.AB, input.buttonEventClick(), function () {
    control.reset()
})
input.onButtonPressed(Button.B, function () {
    if (spielerX < 4) {
        led.unplot(spielerX, 4)
        spielerX += 1
        led.plot(spielerX, 4)
    }
})
let gegnerY = 0
let gegnerX = 0
let spielerX = 0
spielerX = 2
let spielLaeuft = true
// Startgeschwindigkeit (ms)
let geschwindigkeit = 300
// Spieler startet in der Mitte unten
led.plot(spielerX, 4)
music.setVolume(100)
if (gegnerX == spielerX) {
    music.stopAllSounds()
    music.playMelody("C5 B A G F E D C ", 200)
    basic.showIcon(IconNames.Skull)
    spielLaeuft = false
}
// Spielschleife
basic.forever(function () {
    if (spielLaeuft) {
        gegnerX = randint(0, 4)
        gegnerY = 0
        // Gegner fällt von oben nach unten
        for (let index = 0; index < 5; index++) {
            led.plot(gegnerX, gegnerY)
            basic.pause(geschwindigkeit)
            led.unplot(gegnerX, gegnerY)
            gegnerY += 1
        }
        // Kollision prüfen
        if (gegnerX == spielerX) {
            music.stopAllSounds()
            music.playMelody("C5 B A G F E D C ", 200)
            basic.showIcon(IconNames.Skull)
            spielLaeuft = false
        } else {
            // Geschwindigkeit etwas erhöhen (max. bis ca. 100 ms)
            if (geschwindigkeit > 100) {
                geschwindigkeit += 0 - 10
            }
        }
    }
})
control.inBackground(function () {
    while (true) {
        music.playMelody("C D E G A F E C ", 120)
    }
})
