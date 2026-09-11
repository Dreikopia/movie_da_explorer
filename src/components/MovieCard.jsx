import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

const MovieCard = ({ movie: { title, poster_path, vote_average, release_date, original_language } }) => {

    const posterUrl = poster_path
        ? `https://image.tmdb.org/t/p/w500${poster_path}`
        : '/no-movie.png' // put a placeholder image in your public folder
    return (
        <Card className='py-0 gap-0 min-h-110'>
            <CardContent className='p-0'>
                <img
                    src={posterUrl}
                    alt={title}
                    className='w-full aspect-2/3 object-cover rounded-t-xl max-h-80'
                />
            </CardContent>
            <CardHeader className='mt-4'>
                <CardTitle className='text-lg font-bold'>{title}</CardTitle>
            </CardHeader>
            <CardContent className='mt-2'>
                <div className='flex items-center gap-x-2 text-sm text-muted-foreground'>
                    <img src="./star.svg" alt="star" className='w-4 h-4' />
                    <span>{vote_average ? vote_average.toFixed(1) : 'N/A'}</span>
                    <span>&#183;</span>
                    <span>{release_date ? release_date.split('-')[0] : 'N/A'}</span>
                    <span>&#183;</span>
                    <span>{original_language}</span>
                </div>
            </CardContent>
        </Card>
    )
}

export default MovieCard