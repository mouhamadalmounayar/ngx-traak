export class TraakNode {
    type: string;
    content?: TraakNode[] | string;
    attrs?: any;
    constructor(type: string, content?: TraakNode[] | string, attrs?: any) {
        this.type = type;
        this.content = content;
        this.attrs = attrs;
    }
}
