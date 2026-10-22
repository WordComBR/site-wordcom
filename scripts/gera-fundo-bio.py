"""Gera o fundo da página /bio a partir do banner da marca.

    python scripts/gera-fundo-bio.py

Entrada:  scripts/fonte/wordcom-banner.webp   (master 16:9 da marca)
Saída:    public/marca/bio-fundo.webp         (retrato, ~23 KB)

POR QUE NÃO USAR O BANNER DIRETO

O banner é 16:9. Num celular, `background-size: cover` escala pela altura e
corta na horizontal — e o wordmark ocupa 65% da largura da arte, então ele
é cortado ao meio. Nenhuma posição de fundo resolve: a palavra é larga demais.

Medido, o pior pixel do banner tem luminância 1,0 (é o próprio wordmark
branco). Texto #f6f4f8 em cima dele daria 1,05:1.

O QUE ESTE SCRIPT FAZ

Monta um retrato onde a marca aparece inteira no alto, ocupando LARGURA_MARCA
da largura, e a mesma noite estrelada desce — pela faixa de baixo espelhada,
sem costura — até virar a cor base chapada.

O degradê é um teto de luminância, não um ajuste de gosto: abaixo do lockup a
imagem é rebaixada até TETO, de forma que o texto da página passe no contraste
em cima do PIOR pixel, não do pixel médio.

A tela termina onde a cor já é chapada; dali para baixo quem continua é o
`background-color` do CSS. As bordas laterais também morrem na cor base, então
o mesmo arquivo serve em qualquer largura sem mostrar emenda.
"""

import os
import sys

import numpy as np
from PIL import Image

FONTE = "scripts/fonte/wordcom-banner.webp"
SAIDA = "public/marca/bio-fundo.webp"

BASE = np.array([10, 7, 16], dtype=float)  # #0a0710, o mesmo do CSS
LARGURA = 1080
LARGURA_MARCA = 0.80  # fração da largura ocupada pelo lockup
TETO = 0.045          # luminância máxima onde o texto corre -> 13:1 em #f6f4f8

# bbox do lockup dentro do master: do topo do octopus à base do descritor,
# e da primeira à última letra do wordmark
LOCKUP = (270, 190, 1375, 710)


def lin(c):
    return np.where(c <= 0.04045, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)


def luminancia(a):
    return (
        0.2126 * lin(a[..., 0] / 255)
        + 0.7152 * lin(a[..., 1] / 255)
        + 0.0722 * lin(a[..., 2] / 255)
    )


def main():
    src = Image.open(FONTE).convert("RGB")
    escala = (LARGURA_MARCA * LARGURA) / (LOCKUP[2] - LOCKUP[0])
    bw, bh = int(src.width * escala), int(src.height * escala)
    banner = src.resize((bw, bh), Image.LANCZOS)
    base_lockup = int(LOCKUP[3] * escala)

    inicio, fim = base_lockup + 24, base_lockup + 360
    altura = fim + 60

    tela = Image.new("RGB", (LARGURA, altura), tuple(BASE.astype(int)))
    tela.paste(banner, ((LARGURA - bw) // 2, 0))

    # a noite continua abaixo do banner: a faixa de baixo, espelhada a cada
    # repetição, não deixa costura visível
    faixa_h = 300
    faixa = banner.crop((0, bh - faixa_h, bw, bh))
    y, espelha = bh, True
    while y < altura:
        peca = faixa.transpose(Image.FLIP_TOP_BOTTOM) if espelha else faixa
        tela.paste(peca, ((LARGURA - bw) // 2, y))
        y += faixa_h
        espelha = not espelha

    a = np.asarray(tela).astype(float)
    yy = np.arange(altura)[:, None]
    rampa = np.clip((yy - inicio) / (fim - inicio), 0, 1)

    # teto de luminância que desce: 1,0 no lockup (intacto) até TETO embaixo
    teto = 1.0 + (TETO - 1.0) * rampa
    L = luminancia(a)
    k = np.where(
        L > teto,
        np.power(np.clip(teto, 1e-6, None) / np.clip(L, 1e-6, None), 1 / 2.4),
        1.0,
    )
    a *= k[..., None]

    # e o encontro com a cor chapada, para a base do CSS continuar sem degrau
    a = a * (1 - rampa)[..., None] + BASE * rampa[..., None]

    # vinheta lateral pela mesma razão, na horizontal
    xx = np.arange(LARGURA)[None, :]
    borda = np.clip(np.minimum(xx, LARGURA - 1 - xx) / (0.07 * LARGURA), 0, 1) ** 0.6
    a = a * borda[..., None] + BASE * (1 - borda)[..., None]

    saida = Image.fromarray(np.clip(a, 0, 255).astype(np.uint8))
    saida.save(SAIDA, quality=82, method=6)

    # relatório: onde o conteúdo pode começar, medido e não estimado
    b = np.asarray(saida).astype(float)
    Lb = luminancia(b)
    texto = luminancia(np.array([[[246, 244, 248]]], dtype=float))[0, 0]
    apoio = luminancia(np.array([[[201, 194, 214]]], dtype=float))[0, 0]

    print("%s  %dx%d  %d KB" % (SAIDA, LARGURA, altura, os.path.getsize(SAIDA) // 1024))
    print("lockup y %d..%d" % (int(LOCKUP[1] * escala), base_lockup))
    seguro = None
    for y in range(base_lockup, altura):
        pior = Lb[y:].max()
        if (apoio + 0.05) / (pior + 0.05) >= 4.5:
            seguro = y
            break
    if seguro is None:
        print("ERRO: nenhuma altura dá 4,5:1 para o texto de apoio")
        return 1
    pior = Lb[seguro:].max()
    print(
        "conteúdo seguro a partir de y %d  (%.3f x largura)   texto %.1f:1   apoio %.1f:1"
        % (
            seguro,
            seguro / LARGURA,
            (texto + 0.05) / (pior + 0.05),
            (apoio + 0.05) / (pior + 0.05),
        )
    )
    print("o CSS usa 0.700 — confira se este número subiu")
    return 0


if __name__ == "__main__":
    sys.exit(main())
