import { useEffect, useState } from "react"

import { ICurio } from '../types/curio';

import "../styles/list-grid.scss"
import { ContainerActionItem } from './containerActionItem';
import { ContainerActionNotItem } from './containerActionNotItem';

export const ListGridDev = () => {
    const [dataCurio, setDataCurio] = useState<[] | ICurio[]>([])

    // function get data curio
    useEffect(()=>{
        Promise.all([
                fetch('data/curio_universal.json').then(resp => resp.json()),
                fetch('data/curio_ruins.json').then(resp => resp.json()),
                fetch('data/curio_cove.json').then(resp => resp.json()),
                fetch('data/curio_warrens.json').then(resp => resp.json()),
                fetch('data/curio_weald.json').then(resp => resp.json()),
            ]).then(( arrayData: ICurio[][] ) => {
                const allCurios = arrayData.reduce(( prev, curr )=> [...prev, ...curr] ,[]);
                setDataCurio( allCurios );
            })
    }, [])

    const capitalizeText = ( value: string ) => {
        const words: string[] = value.split(" ");
        const capitalize = words.map( word => word[0].toLocaleUpperCase() + word.slice(1) )
        
        return capitalize.join(" ")
    }

    return (
        <section className="list-curio">
            {
                dataCurio.map( curio => <div className="item-curio-container">
                    <div className="item-curio-column">
                        <img className="item-curio-img" src={curio.linkImg}/>
                        <p className="item-curio-name">{ capitalizeText(curio.name) }</p>
                        <p className="item-curio-spawn">{ capitalizeText(curio.spawn) }</p>
                    </div>

                    <div className="item-curio-column">
                        <ContainerActionItem actionItems={curio.actionItem} />
                    </div>

                    <div className="item-curio-column">
                        <ContainerActionNotItem actionNotItem={ curio.actionNotItem }/>
                    </div>


                </div>)
            }
        </section>
    )
}