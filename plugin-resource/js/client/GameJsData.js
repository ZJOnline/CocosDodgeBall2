module.exports = {
    Monster: {
        1: {
            path: "Prefabs/Enemy/",
            name: "Boss1"
        }
    },
    ObjectPool: {
        1: {
            path: "Prefabs/Enemy/",
            name: "ball",
            count: 50
        },
        2: {
            path: "Prefabs/Enemy/",
            name: "balldie_1",
            count: 10
        },
        3: {
            path: "Prefabs/Enemy/",
            name: "balldie_2",
            count: 10
        },
        4: {
            path: "Prefabs/Enemy/",
            name: "balldie_3",
            count: 10
        },
        5: {
            path: "Prefabs/",
            name: "Player",
            count: 1
        },
        6: {
            path: "Prefabs/Enemy/",
            name: "Bullet",
            count: 50
        }
    },
    Refresh: {
        1: {
            name: "",
            monsterID: 1,
            time: 5,
            posX: 0,
            posY: 0,
            random: !1
        },
        2: {
            name: "",
            monsterID: 1,
            time: 20,
            posX: 0,
            posY: 100,
            random: !1
        }
    },
    Stage: {
        1: {
            name: "关卡1",
            spawn: 1,
            time: 5
        },
        2: {
            name: "关卡2",
            spawn: 2,
            time: 21
        },
        3: {
            name: "关卡3",
            spawn: 2,
            time: 22
        },
        4: {
            name: "关卡4",
            spawn: 2,
            time: 23
        },
        5: {
            name: "关卡5",
            spawn: 2,
            time: 24
        }
    }
};