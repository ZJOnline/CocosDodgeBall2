export class ObjectPool{
    ObjectPool: Array<ObjectPoolItem> = [];
}

class ObjectPoolItem{
    path: string;
    name: string;
    count: number;
}
