import { createSignal } from 'solid-js'
import { createMachine, interpret } from "xstate"
import { inspect } from "@xstate/inspect"


inspect({
    iframe: false,
})


interface TrafficLightContext {
    colour: string
}


export const trafficLightMachine =
    /** @xstate-layout N4IgpgJg5mDOIC5QBUBOBDAZpglgYwBkcoALAFwDoBxVMMAOwGIA5AUQA1kBtABgF1EoAA4B7WDjI4R9QSAAeiAEyKArBQDMATgAsADl0A2RToCM6gyYA0IAJ5KLFY7vUmei7dsUGA7LoC+ftZoWLiExOQUAIIAtgBGYKgsHNz8sqLiktKyCgjKalp6hsbaZhba1nYIupoUejxmWt7a3uYq6gFBGNj4RKSUAEqQSZy8Akgg6RJSMuM55iYU3t5eKgbaKiuKSxWIJr4UJhaabpru5oo82gGBIPQiEHCywd1hfWliU1mzuwYGFJq6YyrC6aY7eAzqHYIAC0um0i0ubXUgJMmhUKhKHRAz1CvQiNDoM2EH0yRPkShM8IBQKMPFBPHBkNsiHUinU-x4RkK9XU6lWWJxPXClBi8VQ7wy02yFKpgLRtPpjKhe10B152h0uhagI17RugteEUGEAlnzJOUUlP+cuBdLBEKhikWcNcls1xyB1z8QA */
    createMachine<TrafficLightContext>({
        id: "trafficlight",
        initial: "go",
        context: {
            colour: "",
        },
        states: {
            go: {
                entry(context, event, meta) {
                    context.colour = "green"
                },
                on: {
                    NEXT: {
                        target: "wait",
                    },
                },
            },
            wait: {
                entry(context, event, meta) {
                    context.colour = "orange"
                },
                on: {
                    NEXT: {
                        target: "stop",
                    },
                },
            },
            stop: {
                entry(context, event, meta) {
                    context.colour = "red"
                },
                on: {
                    NEXT: {
                        target: "go",
                    },
                },
            },
        },
    })


export const trafficLightActor = interpret(trafficLightMachine, { devTools: true }).start()






const [trafficLightState, setTrafficLightState] = createSignal(trafficLightActor.getSnapshot())

trafficLightActor.onTransition((newState) => {
    console.log('TrafficLight: state changed', newState.value)
    setTrafficLightState(newState)
})



export default function TrafficLight() {


    return (
        <div>
            <div
                class={` bg-${trafficLightState().context.colour}-500 `}
            >
                {trafficLightState().value}
            </div>

            <button class="btn btn-primary" onClick={() => trafficLightActor.send({ type: 'NEXT' })}>Next</button>
        </div>
    )

}

