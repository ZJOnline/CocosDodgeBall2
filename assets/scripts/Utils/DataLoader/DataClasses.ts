import Tool from "../Tool";

export class DataTable<T extends DataTableItem>{
    protected dataTable: Array<T> = [];
    protected dataDic: Map<number, T>;

    set DataTable(_any: any) {
        this.dataTable = _any;
        this.convertData();
    }

    /**
     *
     */
    constructor() {
        this.dataDic = new Map();
    }

    protected convertData() {
        if (this.dataTable == null || this.dataTable == undefined)
            return;
        for (let i = 0; i < this.dataTable.length; i++) {
            if (this.dataDic.has(this.dataTable[i].id)) {
                Tool.log("Error! already has id:", this.dataTable[i].id);
            }
            this.dataDic.set(this.dataTable[i].id, this.dataTable[i]);
        }
    }

    getData(_id: number): any {
        if (!this.dataDic.has(_id)) {
            Tool.log("can't find data!id=", _id);
            return null;
        }
        return this.dataDic.get(_id);
    }

    getAllData() {
        return this.dataDic;
    }

    getAllDataList() {
        return this.dataTable;
    }
}

export class DataListTable<T extends DataTableItem> extends DataTable<T>{
    protected datalistDic: Map<number, Array<T>>;
    /**
     *
     */
    constructor() {
        super();
        this.datalistDic = new Map();
    }

    convertData() {
        for (let i = 0; i < this.dataTable.length; i++) {
            if (this.datalistDic.has(this.dataTable[i].id)) {
                let value = this.datalistDic.get(this.dataTable[i].id);
                value.push(this.dataTable[i]);
            }
            else {
                this.datalistDic.set(this.dataTable[i].id, [this.dataTable[i]]);
            }
        }
    }

    getData(_id: number) {
        if (!this.datalistDic.has(_id)) {
            Tool.log("can't find data!id=", _id);
            return null;
        }
        return this.datalistDic.get(_id);
    }

}

class DataTableItem {
    id: number;
}

export class ObjectPoolDTItem extends DataTableItem {
    path: string;
    name: string;
    count: number;
}

export class StageDTItem extends DataTableItem {
    name: string;
    spawn: number;
    time: number;
}


export class RefreshDTItem extends DataTableItem {
    name: string;
    monsterID: number;
    time: number;
    posX: number;
    posY: number;
    random: boolean;
}

export class MonsterDTItem extends DataTableItem {
    name: string;
    path: string;
}