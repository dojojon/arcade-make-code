namespace SpriteKind {
    export const Rock = SpriteKind.create()
}
function makeSharks () {
    for (let index = 0; index <= 5; index++) {
        sharkEnemy = sprites.create(img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . b . . . . . . . .
            . . . . . . b b b . . . . . . .
            . . . . . . b c b b . . . . . .
            . . . . . . b b c b b . . . . .
            b . . . . b b b b b b b b b . .
            b b . . b b b b b c b b 1 b b .
            b b b . b c b b c b b 1 2 1 b b
            . b b b b c b b c b b b 1 b b b
            . b b b b c b b c b b b b b b b
            b b b . b b c b b c b b 1 c 1 c
            b b . . b b b b b b b b b b b b
            b . . . . b b b b b b b b b b .
            . . . . . . . b b b b b . . . .
            . . . . . . . . . . . . . . . .
        `, SpriteKind.Enemy)
        scene.placeOnRandomTile(sharkEnemy, 14)
        sharks.push(sharkEnemy)
        sharkEnemy.follow(fish, 30)
    }
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (direction == "left") {
        fish.image.flipX()
        direction = "right"
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (direction == "right") {
        fish.image.flipX()
        direction = "left"
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    music.baDing.play()
    scene.placeOnRandomTile(fishFood, 4)
    if (info.score() >= 5) {
        game.over(true, effects.smiles)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy()
})
let sharks: Sprite[] = []
let sharkEnemy: Sprite = null
let direction = ""
let fishFood: Sprite = null
let fish: Sprite = null
let sharkEnemy2 = null
fish = sprites.create(img`
    . . . . . . . . . . . . . . . .
    . . . . . 4 4 2 . . . . . . . .
    . . . . 4 4 4 4 4 . . . . . . .
    . . 4 4 4 2 4 4 4 4 4 . . . . 4
    . 4 4 4 4 4 2 4 2 4 4 . . . 4 4
    . 4 1 1 1 4 2 4 4 2 4 4 . 4 4 4
    4 4 1 f 1 4 2 4 4 2 4 4 4 4 4 2
    4 4 1 1 1 4 2 4 4 2 4 2 4 4 2 4
    4 4 4 4 4 4 2 4 4 2 4 4 4 4 2 4
    4 4 4 4 4 4 2 4 4 2 4 4 . 4 4 2
    . 4 4 4 4 2 2 4 2 4 4 4 . . 4 4
    . . 4 4 4 4 4 4 4 4 4 . . . . 4
    . . . . 4 4 4 4 4 4 . . . . . .
    . . . . . 4 2 4 . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`, SpriteKind.Player)
fishFood = sprites.create(img`
    . . . . c c c b b b b b . . . .
    . . c c b 4 4 4 4 4 4 b b b . .
    . c c 4 4 4 4 4 5 4 4 4 4 b c .
    . e 4 4 4 4 4 4 4 4 4 5 4 4 e .
    e b 4 5 4 4 5 4 4 4 4 4 4 4 b c
    e b 4 4 4 4 4 4 4 4 4 4 5 4 4 e
    e b b 4 4 4 4 4 4 4 4 4 4 4 b e
    . e b 4 4 4 4 4 5 4 4 4 4 b e .
    8 7 e e b 4 4 4 4 4 4 b e e 6 8
    8 7 2 e e e e e e e e e e 2 7 8
    e 6 6 2 2 2 2 2 2 2 2 2 2 6 c e
    e c 6 7 6 6 7 7 7 6 6 7 6 c c e
    e b e 8 8 c c 8 8 c c c 8 e b e
    e e b e c c e e e e e c e b e e
    . e e b b 4 4 4 4 4 4 4 4 e e .
    . . . c c c c c e e e e e . . .
`, SpriteKind.Food)
controller.moveSprite(fish, 60, 60)
scene.cameraFollowSprite(fish)
scene.setBackgroundColor(9)
scene.setTileMap(img`
    . . . . . . . . . . . . . . . . . . . . . . . . . e . 4 . . . . 4 . . . . . . .
    . . . . . . . . 4 . . 6 . . . . . . . . 6 . 4 . . . . . . . . . . . . . . . . .
    . . 4 . . . . . . . . 6 . . e . . . . . 6 . . . 6 6 6 6 6 6 . . . . . . . . . .
    . . . . . . . . . . 7 6 . . . . . . . . 6 . . . 6 . . . . . . . e . . . . . . .
    . . 6 6 6 . . . . . 7 . . . . . . . . . 6 6 6 6 6 . . . . . . . . . . . 7 . . .
    . . . . 6 . . . . . 7 . . . . . . . . . . . . . . . . . . 7 . . . 4 . . 7 . . .
    . . . . 6 . . 4 . . 6 6 6 . . . . . . . . . . . . . 4 . 6 6 6 . . . . . 7 . . .
    . . 4 . 6 . . . . . 6 . . . . . . . . . . . e . . 7 . . 6 7 . . . . . 6 6 6 6 6
    . . . . . . e . . . 6 4 . . . . . 4 . 7 . . . . . 6 6 6 6 7 . . . . . . . . . .
    . . . . . . . . 7 6 6 . . . . . . . . 7 . . . . . . . . . 7 . . . . . . . . . .
    . . . . . . . . 7 . . . . . . . . . . 7 . . . 7 . . . . . 7 . . . . . . e . . .
    . 7 . . . . . . 7 . . . . . 7 . . e . 7 6 . . 7 . . 4 . . 7 . . . . 7 . . . . .
    . 7 . . 7 . . . 7 . . 4 . . 7 . . . . 7 6 6 . 7 . . . . . 7 . . . . 7 . . 4 . .
    . 7 . . 7 . . . 7 . . . . . 7 . . 4 . 7 6 6 . 7 . . . . . 7 . . 4 . 7 . . . . .
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
`, TileScale.Sixteen)
scene.setTile(7, img`
    . . . . . 7 7 6 7 7 7 . . . . .
    . . . . . 7 7 6 7 7 . . . . . .
    . . . . . 7 6 7 7 7 . . . . . .
    . . . . 7 7 6 7 7 . . . . . . .
    . . . 7 7 7 6 7 7 . . . . . . .
    . . 7 7 7 6 7 7 7 . . . . . . .
    . 7 7 7 6 7 7 7 . . . . . . . .
    . 7 7 7 6 7 7 7 . . . . . . . .
    . . 7 7 6 7 7 . . . . . . . . .
    . . 7 7 7 6 7 . . . . . . . . .
    . . . 7 7 7 6 7 . . . . . . . .
    . . . . . 7 7 6 7 . . . . . . .
    . . . . . . 7 6 7 7 . . . . . .
    . . . . . . 7 6 7 7 7 . . . . .
    . . . . . . 7 7 6 7 7 . . . . .
    . . . . . 7 7 7 7 6 7 . . . . .
`, true)
scene.setTile(5, img`
    . e e e e . . e e e e . . e e e
    e e e e e e e e e e e e e e e e
    d e e d d d e e e d d d d d e e
    d d d d d d d d d d d d d d d d
    d d d e d d d e d d d d d e d d
    d d d d d d d d d d e d d d d d
    d d d d d d d d d d e d d d d d
    d d d d d e d d d d d d d d d d
    d d d d d d d d d d d d d c d d
    d d e d d d d d d d e d d d d d
    d d d d d c d d d d d d d d e d
    d d d d d d d d d d d d d d d d
    d d d d d d d d e d d d d d d d
    d d d e d d d d d d d d c d d c
    d d d d d d d d d d d d d d d d
    d d d d d d d d d d d d d d d d
`, true)
scene.setTile(4, img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`, false)
scene.setTile(14, img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`, false)
scene.setTile(6, img`
    . b b d d d . . . . b d d d . .
    . b b d d d d d b b b b b b . .
    b b b d d d d d b b b b b . . .
    b b b d d d d d b b b b b b b .
    d d d d d d d d b b b b b d d .
    . d d d d d d d d d b b b d d .
    . d d b b b d d d d b b b d d .
    d d b b b b d . . d b b b d d d
    d d b b b b d d . d b b b d d d
    d d b b b b d d . . b b b d d .
    . d b b b b b d d d d d d d d d
    . d b b b b b d d d b b b d d d
    . . d b b b b d d d b b b b d d
    . . d d d d d d d d b b b b b d
    . . d d d d d d d d b b b b b d
    . d d d d . . . d d d b b b b d
`, true)
direction = "left"
effects.bubbles.startScreenEffect()
scene.placeOnRandomTile(fishFood, 4)
makeSharks()
info.setLife(3)
game.onUpdate(function () {
    for (let value of sharks) {
        if (value.x < fish.x) {
            value.vx = 20
        } else if (value.x > fish.x) {
            value.vx = -20
        }
    }
})
