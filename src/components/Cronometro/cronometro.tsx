import React from "react";
import Button from "../buttons/button";
import Relogio from "./Relogio/relogio";
import style from "./cronometro.module.scss"
import { Itarefa } from "../types/Itarefa";
import { useEffect, useState } from "react";
import tempoParaSegundos from "../../common/utils/time";

interface Props {
    selecionado: Itarefa | undefined,
    finalizarTarefa: () => void
}
export default function Cronometro({ selecionado, finalizarTarefa }: Props) {
    const [tempo, setTempo] = useState<number>();

    useEffect(() => {
        if (selecionado?.tempo) {
            setTempo(tempoParaSegundos(selecionado.tempo))
        }
    }, [selecionado])

    function contagemRegressiva(contador: number = 0) {
        console.log(tempo)
        setTimeout(() => {
            if (contador > 0) {
                setTempo(contador - 1);
                return contagemRegressiva(contador - 1);
            }
            finalizarTarefa();
        }, 1000);
    }

    return (
        <div className={style.cronometro}>
            <p className={style.titulo}>Escolha o card e inicie o cronômetro</p>
            <div className={style.relogioWrapper}>
                <Relogio tempo={tempo} />
            </div>
            <Button onClick={() => contagemRegressiva(tempo)}>
                Começar!
            </Button>
        </div >
    )
}