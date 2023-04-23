export default interface Task {
    _id: string;
    title: string;
    category: string;
    description: string;
    carriedOut: boolean;
    startDate: Date;
    estimatedDate: Date;
    endDate: Date;
    user: any;
}