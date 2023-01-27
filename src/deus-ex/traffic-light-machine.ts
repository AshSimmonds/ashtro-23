import { createMachine, interpret } from "xstate"


export const trafficLightMachine = createMachine({
    id: "TrafficLight",
    initial: "Green",
    states: {
        Green: {
            on: {
                NEXT: {
                    target: "Amber",
                },
            },
        },
        Amber: {
            on: {
                NEXT: {
                    target: "Red",
                },
            },
        },
        Red: {
            on: {
                NEXT: {
                    target: "Green",
                },
            },
        },
    },
    schema: {
        context: {} as {},
        events: {} as { type: "NEXT" },
    },
    context: {},
    predictableActionArguments: true,
    preserveActionOrder: true,
})


export const trafficLightActor = interpret(trafficLightMachine).start()

