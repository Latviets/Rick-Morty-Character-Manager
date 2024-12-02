import { useState } from 'react'
import { Character } from '../../../CharacterType/types'
import CharacterModal from '../../../molecules/CharacterModal'
import './CharacterCard.css'

type Props = {
  character: Character
  isSelected: boolean
  isDimmed: boolean
  onSelect: (id: number | null) => void
  onFavoriteToggle: (id: number) => void
  favorites: Set<number>
}

const CharacterCard = ({
  character,
  isSelected,
  isDimmed,
  onSelect,
  onFavoriteToggle,
  favorites
}: Props) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <div
        className={`character-card ${isSelected ? 'selected' : ''} ${isDimmed ? 'dimmed' : ''}`}
        onClick={() => setShowModal(true)}
      >
        <button
          className={`favorite-button ${favorites.has(character.id) ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation()
            onFavoriteToggle(character.id)
          }}
        >
          {favorites.has(character.id) ? '♥' : '♡'}
        </button>

        <img
          src={character.image}
          alt={character.name}
          className="character-image"
        />
        <h3 className="character-name">{character.name}</h3>
        <p className="character-status">
          <strong>Status: </strong>{character.status}
        </p>
      </div>

      {showModal && (
        <CharacterModal
          character={character}
          onClose={() => {
            setShowModal(false)
            onSelect(null)
          }}
        />
      )}
    </>
  )
}

export default CharacterCard