
export interface Kanal {
    emit(event: string, ...data):undefined;
    kill(event: string):undefined;
    on(event: string):undefined;
    once(event: string):undefined;
}

declare const kanal: Kanal;

export default kanal