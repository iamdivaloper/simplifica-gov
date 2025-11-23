'use client';

import { useState } from 'react';
import { searchGovernmentData } from '@/app/actions';
import { NormalizedItem } from '@/lib/ai-normalizer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Loader2, AlertCircle, ExternalLink } from 'lucide-react';

export default function SearchPage() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<NormalizedItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searched, setSearched] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        setError(null);
        setResults([]);
        setSearched(true);

        try {
            const result = await searchGovernmentData(query);
            if (result.success) {
                setResults(result.data);
            } else {
                setError(result.error);
            }
        } catch (err) {
            setError('Parece que tivemos um soluço na conexão. Respire fundo e tente novamente em alguns segundos.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto py-12 px-4 max-w-4xl">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Busca Unificada Governamental</h1>
                <p className="text-muted-foreground text-lg">
                    Pesquise em múltiplas fontes oficiais (Câmara, Senado, Diário Oficial) com inteligência artificial.
                </p>
            </div>

            <form onSubmit={handleSearch} className="flex gap-4 mb-12">
                <Input
                    type="text"
                    placeholder="Ex: Reforma Tributária, Educação, Saúde..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="h-14 text-lg"
                />
                <Button type="submit" size="lg" className="h-14 px-8" disabled={loading}>
                    {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Search className="mr-2 h-5 w-5" />}
                    Pesquisar
                </Button>
            </form>

            {error && (
                <div className="bg-destructive/10 text-destructive p-4 rounded-lg flex items-center gap-3 mb-8">
                    <AlertCircle className="h-5 w-5" />
                    <p>{error}</p>
                </div>
            )}

            <div className="space-y-6">
                {loading && (
                    <div className="text-center py-12 text-muted-foreground">
                        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                        <p>Consultando fontes oficiais e normalizando dados com IA...</p>
                    </div>
                )}

                {!loading && searched && results.length === 0 && !error && (
                    <div className="text-center py-12 text-muted-foreground">
                        <p>Nenhum resultado encontrado para "{query}".</p>
                    </div>
                )}

                {results.map((item) => (
                    <Card key={item.id} className="hover:shadow-md transition-shadow">
                        <CardHeader>
                            <div className="flex justify-between items-start gap-4">
                                <div className="space-y-1">
                                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                                        {item.source}
                                    </span>
                                    <CardTitle className="text-xl mt-2">
                                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-2">
                                            {item.title}
                                            <ExternalLink className="h-4 w-4 text-muted-foreground" />
                                        </a>
                                    </CardTitle>
                                </div>
                                <span className="text-sm text-muted-foreground whitespace-nowrap">
                                    {new Date(item.date).toLocaleDateString('pt-BR')}
                                </span>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                {item.summary}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {item.tags?.map((tag) => (
                                    <span key={tag} className="text-xs px-2 py-1 bg-secondary rounded-md text-secondary-foreground">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
