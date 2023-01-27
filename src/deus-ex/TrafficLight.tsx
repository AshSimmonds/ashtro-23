import { createSignal } from 'solid-js'
import { assign, createMachine, interpret } from "xstate"
import { inspect } from "@xstate/inspect"


inspect({
    iframe: false,
})


interface TrafficLightContext {
    colour: string
}


export const trafficLightMachine =
    /** @xstate-layout N4IgpgJg5mDOIC5QBcBOBDAZpglgYwBscoALZAOigHsBiAOQFEANAFQG0AGAXUVAAcqsHMhxUAdrxAAPRAGYO5AEwBWZQDYAHLI0BOXSoDsGgDQgAnnMWLyBxbYAsOgIz3VHIwF8PptFlyFiMnIAd3RhemZ2bkkBIRFxSRkEeSVVTW09HUMTc0RlWVlyDSdip2VFWXtZA2UvHwxsfCJSClhkKj4I1k4eJBBY4VEJPqSrJ3JlDlUM+w57RR0DUwsEeZ0Jjg1JtQMDRw4K+y9vEDEqCDhJX0aAlpjBQYSRxABaexyVpxdySur5LLUyicsh2dRA138zSC1HucSGiUQHGWiEUHHGWgqajUOiqsmUOm0YIhTUCFFCwlhj2GoCSSNyqym5B0zL09j2TkUTg4OKJDUhpPIbQ6lPi1OkiORCDUqPIJScBgJnMUug4amOHiAA */
    createMachine<TrafficLightContext>({
        id: "trafficlight",
        initial: "go",
        context: {
            colour: "",
        },
        states: {
            go: {
                entry: assign({
                    colour: "green",
                }),
                on: {
                    NEXT: {
                        target: "wait",
                    },
                },
            },
            wait: {
                entry: assign({
                    colour: "orange",
                }),
                on: {
                    NEXT: {
                        target: "stop",
                    },
                },
            },
            stop: {
                entry: assign({
                    colour: "red",
                }),
                on: {
                    NEXT: "go",
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

            <div class=" bg-green-500 hidden ">go</div>
            <div class=" bg-orange-500 hidden ">wait</div>
            <div class=" bg-red-500 hidden ">stop</div>

            <div
                class={` p-12 bg-${trafficLightState().context.colour}-500 `}
            >
                <h2 class="text-black">{trafficLightState().value}</h2>
            </div>

            <button class="btn btn-primary" onClick={() => trafficLightActor.send({ type: 'NEXT' })}>Next</button>
        </div>
    )

}

