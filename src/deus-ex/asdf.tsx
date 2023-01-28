import { createSignal, Show } from 'solid-js'
import { assign, createMachine, interpret } from "xstate"
import { inspect } from "@xstate/inspect"


inspect({
    iframe: false,
})


interface AsdfContext {
    country: "Australia" | "Elsewhere"
    entity: "Individual" | "Company"
    overseasPayloadPermit: boolean
    launchPermit: boolean
    entityName: string
    cargoSpaceRequired: boolean
}


export const asdfMachine = createMachine({
    id: "recombobulator",
    initial: "idling",
    states: {
        idling: {
            on: {
                WHO: {
                    target: "whoing",
                },
                WHAT: {
                    target: "whating",
                },
            },
        },
        whoing: {
            on: {
                WHO_DONE: {
                    target: "summarying",
                },
                SELECT_ENTITY: {},
                SELECT_COUNTRY: {},
            },
        },
        whating: {
            on: {
                OVERSEAS_PAYLOAD_PERMIT: {
                    target: "opping",
                },
                LAUNCH_PERMIT: {
                    target: "launching",
                },
                COMPANY: {
                    target: "companying",
                },
            },
        },
        opping: {
            on: {
                OPP_DONE: {
                    target: "summarying",
                },
            },
        },
        launching: {
            on: {
                LAUNCH_DONE: {
                    target: "summarying",
                },
            },
        },
        companying: {
            on: {
                COMPANY_DONE: {
                    target: "summarying",
                },
            },
        },
        summarying: {},
    },
    schema: {
        context: {} as {},
        events: {} as
            | { type: "WHO" }
            | { type: "WHAT" }
            | { type: "OVERSEAS_PAYLOAD_PERMIT" }
            | { type: "LAUNCH_PERMIT" }
            | { type: "COMPANY" }
            | { type: "WHO_DONE" }
            | { type: "OPP_DONE" }
            | { type: "LAUNCH_DONE" }
            | { type: "COMPANY_DONE" }
            | { type: "SELECT_ENTITY" }
            | { type: "SELECT_COUNTRY" },
    },
    context: {},
    predictableActionArguments: true,
    preserveActionOrder: true,
});



export const asdfActor = interpret(asdfMachine, { devTools: true }).start()




const [asdfState, setAsdfState] = createSignal(asdfActor.getSnapshot())

asdfActor.onTransition((newState) => {
    setAsdfState(newState)
})



export default function Asdf() {
    return (
        <div>

            <h2>{asdfState().value}</h2>


            <Show when={asdfState().matches("idling")}>
                <div>
                    <button class="btn" onClick={() => asdfActor.send("WHO")}>Who</button>
                    <button class="btn" onClick={() => asdfActor.send("WHAT")}>What</button>
                </div>
            </Show>

            <Show when={asdfState().matches("whoing")}>
                <div>
                    <button class="btn" onClick={() => asdfActor.send("WHO_DONE")}>Who Done</button>
                    <button class="btn" onClick={() => asdfActor.send("SELECT_ENTITY")}>Select Entity</button>
                    <button class="btn" onClick={() => asdfActor.send("SELECT_COUNTRY")}>Select Country</button>
                </div>
            </Show>

            <Show when={asdfState().matches("whating")}>
                <div>
                    <button class="btn" onClick={() => asdfActor.send("OVERSEAS_PAYLOAD_PERMIT")}>Overseas Payload Permit</button>
                    <button class="btn" onClick={() => asdfActor.send("LAUNCH_PERMIT")}>Launch Permit</button>
                    <button class="btn" onClick={() => asdfActor.send("COMPANY")}>Company</button>
                </div>
            </Show>

            <Show when={asdfState().matches("opping")}>
                <div>
                    <button class="btn" onClick={() => asdfActor.send("OPP_DONE")}>OPP Done</button>
                </div>
            </Show>

            <Show when={asdfState().matches("launching")}>
                <div>
                    <button class="btn" onClick={() => asdfActor.send("LAUNCH_DONE")}>Launch Done</button>
                </div>
            </Show>

            <Show when={asdfState().matches("companying")}>
                <div>
                    <button class="btn" onClick={() => asdfActor.send("COMPANY_DONE")}>Company Done</button>
                </div>
            </Show>

            <Show when={asdfState().matches("summarying")}>
                <div>
                    <button class="btn" onClick={() => asdfActor.send("WHO")}>Who</button>
                    <button class="btn" onClick={() => asdfActor.send("WHAT")}>What</button>
                </div>
            </Show>
        </div>

    )
}




