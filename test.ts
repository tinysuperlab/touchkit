let TouchPin2 = 0
mp3touch.init(
)
TouchPin2 = 0
basic.forever(() => {
    TouchPin2 = mp3touch.touchedFeeler()
    if (TouchPin2 >= 0) {
        mp3touch.playIndex(TouchPin2 + 1)
        basic.showNumber(TouchPin2)
    }
})
