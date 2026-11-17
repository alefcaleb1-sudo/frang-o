import { useEffect, useMemo, useState, type ReactNode } from "react";

const photos = {
  hero: "https://images.unsplash.com/photo-1617636423451-0db0119c14cd?auto=format&fit=crop&w=1400&q=90",
  chicken:
    "https://images.unsplash.com/photo-1630564510761-a560db92a09b?auto=format&fit=crop&w=900&q=85",
  chickenClose:
    "https://images.unsplash.com/photo-1641873933980-fcff60026f50?auto=format&fit=crop&w=900&q=85",
  chickenBoard:
    "https://images.unsplash.com/photo-1672787380741-6fe6c7450668?auto=format&fit=crop&w=900&q=85",
  chickenGrill:
    "https://images.unsplash.com/photo-1630564510791-1b8a156ec387?auto=format&fit=crop&w=900&q=85",
  beans:
    "https://images.unsplash.com/photo-1662743086910-38419bbf7f34?auto=format&fit=crop&w=800&q=85",
  mayo: "https://images.unsplash.com/photo-1707080023804-ccf44ad50af2?auto=format&fit=crop&w=800&q=85",
  feijoada:
    "https://images.unsplash.com/photo-1790701909034-6c7b45c7b58a?auto=format&fit=crop&w=800&q=85",
  table:
    "https://images.unsplash.com/photo-1778996525694-e87e5eff7a76?auto=format&fit=crop&w=1600&q=90",
};

type IconName =
  | "fire"
  | "heart"
  | "leaf"
  | "clock"
  | "phone"
  | "instagram"
  | "facebook"
  | "code"
  | "arrow"
  | "download"
  | "copy"
  | "close"
  | "folder"
  | "file";

function Icon({ name, size = 22 }: { name: IconName; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  const paths: Record<IconName, ReactNode> = {
    fire: (
      <>
        <path d="M12 22c4 0 7-3 7-7 0-3-1.5-5.5-4-8 .2 3-1.4 4.2-2.8 3.2C10.8 9.2 11.5 5 8 2c.2 4-3 6-3 11 0 5 3 9 7 9Z" />
        <path d="M9.5 17c0 2 1.2 3 2.5 3s2.5-1 2.5-3c0-1.5-1-2.5-2.5-4-1.5 1.5-2.5 2.5-2.5 4Z" />
      </>
    ),
    heart: (
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
    ),
    leaf: (
      <>
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 4.3 19 2 19 2c0 7-2 12-8 13" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6.94C9.74 12.76 12 11 13 9" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    phone: <path d="M21 15.5a10 10 0 0 1-11.6 5L3 22l1.6-6.2A10 10 0 1 1 21 15.5Z" />,
    instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r=".5" fill="currentColor" />
      </>
    ),
    facebook: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M14.5 8h-1.2c-.9 0-1.3.5-1.3 1.4V12h2.5l-.4 2.5H12V21M9.5 12H12" />
      </>
    ),
    code: (
      <>
        <path d="m8 9-4 3 4 3M16 9l4 3-4 3M14 5l-4 14" />
      </>
    ),
    arrow: (
      <>
        <path d="M5 12h14M13 6l6 6-6 6" />
      </>
    ),
    download: (
      <>
        <path d="M12 3v12M7 10l5 5 5-5" />
        <path d="M5 21h14" />
      </>
    ),
    copy: (
      <>
        <rect x="8" y="8" width="12" height="12" rx="2" />
        <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
      </>
    ),
    close: (
      <>
        <path d="m6 6 12 12M18 6 6 18" />
      </>
    ),
    folder: <path d="M3 6a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />,
    file: (
      <>
        <path d="M6 2h8l4 4v16H6Z" />
        <path d="M14 2v5h4" />
      </>
    ),
  };
  return (
    <svg {...common} aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function Mascot({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 220 240"
      role="img"
      aria-label="Mascote Frangão, um galo branco simpático"
    >
      <path
        d="M69 45c-13-24 13-32 23-14 2-26 34-25 33 2 14-21 39-5 29 17"
        fill="#FC2B19"
        stroke="#411b11"
        strokeWidth="7"
        strokeLinejoin="round"
      />
      <path
        d="M52 91C54 51 84 38 119 44c41 7 58 39 43 76 21 22 15 69-14 83-28 14-78 13-98-15-19-26-13-72 2-97Z"
        fill="#fffaf0"
        stroke="#411b11"
        strokeWidth="8"
      />
      <path
        d="M55 87C27 77 25 111 55 119M157 93c33-9 35 27 7 37"
        fill="#fffaf0"
        stroke="#411b11"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d="M67 66c-15 1-24 17-10 27M153 67c15 3 20 18 8 28"
        fill="none"
        stroke="#F0D3A8"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <circle cx="88" cy="84" r="7" fill="#411b11" />
      <circle cx="135" cy="84" r="7" fill="#411b11" />
      <path
        d="m108 92 24 12-24 14-22-14 22-12Z"
        fill="#FCCC53"
        stroke="#411b11"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path d="M100 119c4 14 17 15 22 0" fill="#FC2B19" stroke="#411b11" strokeWidth="5" />
      <path
        d="M73 148c18 14 58 14 76-1"
        fill="none"
        stroke="#F0D3A8"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M86 199v21M137 198v22M74 220h25M124 220h25"
        fill="none"
        stroke="#411b11"
        strokeWidth="8"
        strokeLinecap="round"
      />
    </svg>
  );
}

const chickenProducts = [
  {
    name: "Frango Tradicional",
    description: "Douradinho por fora, macio e suculento por dentro.",
    image: photos.chicken,
  },
  {
    name: "Banda de Frango",
    description: "A porção perfeita, assada lentamente no ponto certo.",
    image: photos.chickenClose,
  },
  {
    name: "Frango com Barbecue",
    description: "Nosso clássico com um toque defumado irresistível.",
    image: photos.chickenBoard,
  },
  {
    name: "Frango com Bacon",
    description: "Sabor marcante, crocância e muita suculência.",
    image: photos.chickenGrill,
  },
];

const sides = [
  {
    name: "Feijão Tropeiro",
    description: "Receita bem temperada, com gostinho de casa.",
    image: photos.beans,
  },
  { name: "Maionese", description: "Cremosa, fresquinha e cheia de sabor.", image: photos.mayo },
  {
    name: "Feijoada",
    description: "Encorpada e preparada com todo o capricho.",
    image: photos.feijoada,
  },
];

function SectionTitle({
  eyebrow,
  title,
  subtitle,
  light = false,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  light?: boolean;
}) {
  return (
    <div className={`section-title ${light ? "light" : ""}`}>
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  );
}

function ProductCard({
  item,
  featured = false,
}: {
  item: (typeof chickenProducts)[number];
  featured?: boolean;
}) {
  return (
    <article className={`product-card ${featured ? "featured" : ""}`}>
      <div className="product-photo">
        <img src={item.image} alt={item.name} />
        {featured && (
          <span className="favorite">
            <Icon name="fire" size={16} /> Queridinho
          </span>
        )}
      </div>
      <div className="product-copy">
        <div>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
        </div>
        <div className="price-line">
          <span>Preço sob consulta</span>
        </div>
        <a className="card-button" href="#contato">
          Consultar produto <Icon name="arrow" size={17} />
        </a>
      </div>
    </article>
  );
}

function BeverageCard({ brand, color, detail }: { brand: string; color: string; detail: string }) {
  return (
    <article className="product-card drink-card">
      <div className="bottle-stage" style={{ "--drink": color } as React.CSSProperties}>
        <div className="bottle">
          <div className="cap" />
          <div className="label">{brand}</div>
        </div>
        <span>Geladinha</span>
      </div>
      <div className="product-copy">
        <div>
          <h3>{brand}</h3>
          <p>{detail}</p>
        </div>
        <div className="price-line">
          <span>Preço sob consulta</span>
        </div>
        <a className="card-button" href="#contato">
          Consultar produto <Icon name="arrow" size={17} />
        </a>
      </div>
    </article>
  );
}

type SourceFile = {
  path: string;
  size: number;
  type: "text" | "binary";
  content?: string;
  url?: string;
};

type SourceManifest = {
  generatedAt: string;
  totalFiles: number;
  totalSize: number;
  files: SourceFile[];
  externalResources: string[];
};

function formatBytes(value: number) {
  if (value < 1024) return `${value} B`;
  if (value < 1024 * 1024) return `${(value / 1024).toFixed(1)} KB`;
  return `${(value / 1024 / 1024).toFixed(1)} MB`;
}

function SourceCenter({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [manifest, setManifest] = useState<SourceManifest | null>(null);
  const [selectedPath, setSelectedPath] = useState("src/App.tsx");
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState(false);
  const [resourceView, setResourceView] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open || manifest) return;
    fetch("/source-export/manifest.json")
      .then((response) => {
        if (!response.ok) throw new Error("Manifesto indisponível");
        return response.json() as Promise<SourceManifest>;
      })
      .then(setManifest)
      .catch(() =>
        setError(
          "Não foi possível carregar os arquivos. Execute pnpm generate:source e atualize a página.",
        ),
      );
  }, [open, manifest]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [open, onClose]);

  const filteredFiles = useMemo(() => {
    if (!manifest) return [];
    const query = search.trim().toLowerCase();
    return query
      ? manifest.files.filter((file) => file.path.toLowerCase().includes(query))
      : manifest.files;
  }, [manifest, search]);

  const selectedFile = manifest?.files.find((file) => file.path === selectedPath);
  const extension = selectedFile?.path.split(".").pop()?.toLowerCase();
  const isImage = extension && ["png", "jpg", "jpeg", "gif", "svg", "webp"].includes(extension);

  async function copySource() {
    if (!selectedFile?.content) return;
    await navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  if (!open) return null;

  return (
    <div
      className="source-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Código-fonte do site"
    >
      <div className="source-topbar">
        <div className="source-title">
          <span>
            <Icon name="code" size={23} />
          </span>
          <div>
            <b>Código-fonte do Frangão</b>
            <small>Arquivos originais utilizados neste projeto</small>
          </div>
        </div>
        <div className="source-actions">
          <a
            className="source-download"
            href="/source-export/frangao-projeto-completo.zip"
            download
          >
            <Icon name="download" size={18} /> Baixar projeto completo (.ZIP)
          </a>
          <button className="source-close" onClick={onClose} aria-label="Fechar código-fonte">
            <Icon name="close" size={21} />
          </button>
        </div>
      </div>

      <div className="source-notice">
        <span>
          <b>Exportação real do projeto.</b> O ZIP preserva a estrutura de pastas, configurações,
          dependências e arquivos utilizados no site.
        </span>
        <a href="https://github.com/new" target="_blank" rel="noreferrer">
          Criar repositório no GitHub <Icon name="arrow" size={15} />
        </a>
      </div>

      {error ? (
        <div className="source-error">{error}</div>
      ) : !manifest ? (
        <div className="source-loading">
          <span />
          Reunindo arquivos do projeto...
        </div>
      ) : (
        <div className="source-workspace">
          <aside className="source-sidebar">
            <div className="source-stats">
              <b>{manifest.totalFiles} arquivos</b>
              <span>{formatBytes(manifest.totalSize)} de código e recursos</span>
            </div>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar arquivo..."
              aria-label="Buscar arquivo"
            />
            <button
              className={`resource-row ${resourceView ? "active" : ""}`}
              onClick={() => setResourceView(true)}
            >
              <Icon name="folder" size={17} />
              Recursos externos
              <span>{manifest.externalResources.length}</span>
            </button>
            <div className="source-tree">
              {filteredFiles.map((file) => (
                <button
                  key={file.path}
                  className={!resourceView && file.path === selectedPath ? "active" : ""}
                  onClick={() => {
                    setSelectedPath(file.path);
                    setResourceView(false);
                  }}
                  title={file.path}
                >
                  <Icon name={file.type === "binary" ? "folder" : "file"} size={15} />
                  <span>{file.path}</span>
                  <small>{formatBytes(file.size)}</small>
                </button>
              ))}
            </div>
          </aside>

          <section className="source-viewer">
            {resourceView ? (
              <>
                <div className="viewer-header">
                  <div>
                    <Icon name="folder" size={17} />
                    <b>Recursos externos utilizados</b>
                  </div>
                  <span>{manifest.externalResources.length} referências</span>
                </div>
                <div className="external-list">
                  <p>
                    Estas imagens e fontes são carregadas por URL no código original. Os endereços
                    abaixo também permanecem registrados dentro dos arquivos do ZIP.
                  </p>
                  {manifest.externalResources.map((url) => (
                    <a href={url} target="_blank" rel="noreferrer" key={url}>
                      <Icon name="arrow" size={15} />
                      <span>{url}</span>
                    </a>
                  ))}
                </div>
              </>
            ) : selectedFile ? (
              <>
                <div className="viewer-header">
                  <div>
                    <Icon name="file" size={17} />
                    <b>{selectedFile.path}</b>
                  </div>
                  <div>
                    <span>{formatBytes(selectedFile.size)}</span>
                    {selectedFile.content && (
                      <button onClick={copySource}>
                        <Icon name="copy" size={15} /> {copied ? "Copiado" : "Copiar"}
                      </button>
                    )}
                    {selectedFile.url && (
                      <a href={selectedFile.url} download>
                        <Icon name="download" size={15} /> Baixar
                      </a>
                    )}
                  </div>
                </div>
                {selectedFile.content !== undefined ? (
                  <pre className="source-code">
                    <code>{selectedFile.content}</code>
                  </pre>
                ) : isImage && selectedFile.url ? (
                  <div className="asset-preview">
                    <img src={selectedFile.url} alt={`Prévia de ${selectedFile.path}`} />
                    <p>Arquivo de imagem original</p>
                  </div>
                ) : (
                  <div className="asset-preview">
                    <Icon name="file" size={48} />
                    <p>Recurso binário disponível para download.</p>
                  </div>
                )}
              </>
            ) : null}
          </section>
        </div>
      )}
      <div className="source-footer">
        <span>
          Gerado diretamente a partir do repositório em{" "}
          {manifest ? new Date(manifest.generatedAt).toLocaleString("pt-BR") : "..."}
        </span>
        <span>Para publicar: baixe o ZIP, envie ao GitHub e importe o repositório na Vercel.</span>
      </div>
    </div>
  );
}

export default function App() {
  const [sourceOpen, setSourceOpen] = useState(false);

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#inicio" aria-label="Frangão - início">
          <Mascot />
          <div>
            <b>FRANGÃO</b>
            <small>ASSADO COM CARINHO</small>
          </div>
        </a>
        <nav aria-label="Navegação principal">
          <a href="#inicio">Início</a>
          <a href="#cardapio">Cardápio</a>
          <a href="#sobre">Nosso sabor</a>
          <a href="#contato">Contato</a>
        </nav>
        <a className="header-cta" href="#cardapio">
          Ver cardápio <Icon name="arrow" size={18} />
        </a>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-dots" />
          <div className="herb herb-one">✦</div>
          <div className="herb herb-two">⌁</div>
          <div className="hero-copy">
            <div className="eyebrow">
              <Icon name="fire" size={18} /> O assado que virou tradição
            </div>
            <h1>FRANGÃO</h1>
            <h2>
              Sabor de verdade,
              <br />
              <em>direto para sua mesa!</em>
            </h2>
            <p>
              Frango assado, acompanhamentos deliciosos e aquele sabor que reúne toda a família.
            </p>
            <a className="primary-button" href="#cardapio">
              VER NOSSO CARDÁPIO <Icon name="arrow" size={20} />
            </a>
            <div className="hero-proof">
              <div className="faces">
                <span>F</span>
                <span>R</span>
                <span>A</span>
              </div>
              <p>
                <b>Feito todos os dias</b>
                <br />
                com ingredientes selecionados
              </p>
            </div>
          </div>
          <div className="hero-visual">
            <div className="sun-shape" />
            <div className="heat-lines">
              <i />
              <i />
              <i />
            </div>
            <div className="hero-image">
              <img
                src={photos.hero}
                alt="Frango inteiro assado, dourado e crocante servido com ervas"
              />
            </div>
            <div className="quality-stamp">
              <Icon name="heart" size={19} />
              <b>FEITO COM</b>
              <strong>CARINHO</strong>
            </div>
            <Mascot className="hero-mascot" />
            <div className="spice-card">
              <span>Tempero da casa</span>
              <b>100%</b> especial
            </div>
          </div>
        </section>

        <section className="ticker" aria-label="Diferenciais">
          <div>
            FRANGO ASSADO NA HORA <span>✦</span> SABOR QUE REÚNE <span>✦</span> RECEITA DE FAMÍLIA{" "}
            <span>✦</span> FEITO COM CARINHO
          </div>
        </section>

        <section className="menu-section" id="cardapio">
          <SectionTitle
            eyebrow="Do forno para sua mesa"
            title="Nosso Cardápio"
            subtitle="Escolha seu favorito e prepare-se para saborear!"
          />
          <div className="category-heading">
            <div>
              <span>01</span>
              <div>
                <h3>Frangos assados</h3>
                <p>Os protagonistas da casa</p>
              </div>
            </div>
            <div className="line" />
          </div>
          <div className="products chicken-grid">
            {chickenProducts.map((item, index) => (
              <ProductCard key={item.name} item={item} featured={index === 0} />
            ))}
          </div>

          <div className="category-heading">
            <div>
              <span>02</span>
              <div>
                <h3>Acompanhamentos</h3>
                <p>Aquele gostinho de comida caseira</p>
              </div>
            </div>
            <div className="line" />
          </div>
          <div className="products three-grid">
            {sides.map((item) => (
              <ProductCard key={item.name} item={item} />
            ))}
          </div>

          <div className="category-heading">
            <div>
              <span>03</span>
              <div>
                <h3>Bebidas</h3>
                <p>Para completar a sua refeição</p>
              </div>
            </div>
            <div className="line" />
          </div>
          <div className="products three-grid">
            <BeverageCard brand="Coca-Cola" color="#ba1414" detail="Garrafa de 2 litros." />
            <BeverageCard brand="Fanta Laranja" color="#f47c1b" detail="Garrafa de 2 litros." />
            <BeverageCard brand="Mineiro" color="#146b3a" detail="Garrafa de 1,5 litro." />
          </div>
        </section>

        <section className="story" id="sobre">
          <div className="story-photo">
            <img src={photos.table} alt="Mesa acolhedora com frango assado e acompanhamentos" />
            <span>Receita que abraça</span>
          </div>
          <div className="story-copy">
            <span className="script">Sabor que reúne</span>
            <h2>
              Tem sabor que transforma qualquer refeição em um <em>momento especial!</em>
            </h2>
            <p>
              O cheirinho que abre o apetite, a mesa cheia e quem a gente ama por perto. É por isso
              que fazemos cada Frangão como se fosse para a nossa própria família.
            </p>
            <div className="benefits">
              <div>
                <i>
                  <Icon name="fire" />
                </i>
                <span>
                  <b>Assado no ponto</b>
                  <small>Dourado e suculento</small>
                </span>
              </div>
              <div>
                <i>
                  <Icon name="leaf" />
                </i>
                <span>
                  <b>Ingredientes frescos</b>
                  <small>Qualidade de verdade</small>
                </span>
              </div>
              <div>
                <i>
                  <Icon name="heart" />
                </i>
                <span>
                  <b>Receita com afeto</b>
                  <small>Sabor de casa</small>
                </span>
              </div>
              <div>
                <i>
                  <Icon name="clock" />
                </i>
                <span>
                  <b>Pronto para servir</b>
                  <small>Praticidade no almoço</small>
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="contact" id="contato">
          <div className="contact-mascot">
            <div className="speech">Pode chamar!</div>
            <Mascot />
          </div>
          <div className="contact-copy">
            <span>Fale com a gente</span>
            <h2>Ficou com alguma dúvida?</h2>
            <p>
              Estamos aqui para ajudar! Envie suas dúvidas, sugestões ou relate qualquer problema.
            </p>
          </div>
          <button className="whatsapp-button" type="button">
            <Icon name="phone" size={25} />
            <span>
              Falar com atendimento<small>Resposta em horário comercial</small>
            </span>
            <Icon name="arrow" size={20} />
          </button>
        </section>
      </main>

      <footer>
        <div className="footer-main">
          <div className="footer-brand">
            <div className="footer-logo">
              <Mascot />
              <div>
                <b>FRANGÃO</b>
                <span>Sabor que reúne</span>
              </div>
            </div>
            <p>Comida gostosa, feita com cuidado e aquele tempero que já virou tradição.</p>
            <div className="socials">
              <button aria-label="Instagram">
                <Icon name="instagram" />
              </button>
              <button aria-label="Facebook">
                <Icon name="facebook" />
              </button>
            </div>
          </div>
          <div className="footer-col">
            <b>Navegue</b>
            <a href="#inicio">Início</a>
            <a href="#cardapio">Cardápio</a>
            <a href="#sobre">Nosso sabor</a>
            <a href="#contato">Contato</a>
          </div>
          <div className="footer-col">
            <b>Atendimento</b>
            <span>Terça a domingo</span>
            <span>10h30 às 14h30</span>
            <span>Consulte disponibilidade</span>
          </div>
          <div className="footer-col">
            <b>Vem almoçar!</b>
            <span>Frango quentinho</span>
            <span>Acompanhamentos frescos</span>
            <span>Todo fim de semana</span>
          </div>
        </div>
        <div className="code-strip">
          <Icon name="code" size={31} />
          <div>
            <b>TODOS OS CÓDIGOS UTILIZADOS NO SITE</b>
            <span>Documentação visual do projeto Frangão</span>
          </div>
          <button className="source-access-button" onClick={() => setSourceOpen(true)}>
            Acessar código-fonte <Icon name="arrow" size={16} />
          </button>
          <span className="doc-lines">
            <i />
            <i />
            <i />
          </span>
        </div>
        <div className="copyright">
          <span>© 2025 Frangão. Todos os direitos reservados.</span>
          <span>Feito com carinho e muito sabor.</span>
        </div>
      </footer>

      <button className="floating-whatsapp" aria-label="Abrir atendimento visual pelo WhatsApp">
        <Icon name="phone" size={30} />
        <span>Fale com a gente</span>
      </button>
      <SourceCenter open={sourceOpen} onClose={() => setSourceOpen(false)} />
    </div>
  );
}
