export type InputType = "text" | "number" | "date"
export type ElementType = "text" | "input";

export type Element = {
    detailId: number;
    type: ElementType;
    text: string;
    label: string;
    inputType: InputType,
    x: number;
    y: number;
    width: number;
    height: number;
};

export type ReportLayout = {
    reportCode: number;
    reportName: string;
    elements: Element[];
}
