/**
 * Fame: Party
 * - Renders party details.
 */

// NOTE: Extremely IPR. Return after more systems have been created so I know what
// components every party member needs.

function FrameParty() {
  // TODO: Make dynamic and ECS friendly, this is just placeholder data
  const party = [
    {
      name: 'Morag',
      weapon: {
        name: 'Iron sword'
      }
    },
    {
      name: 'Boudicca',
      weapon: {
        name: 'Steel battleaxe'
      }
    },
    {
      name: 'Ares',
      weapon: {
        name: 'Dagger'
      }
    },
    {
      name: 'Alyss',
      weapon: {
        name: 'Hawthorne wand'
      }
    }
  ]

  return (
    <aside>
      <p>Party details:</p>
      <ul>
        {
          party.map((member, index) => {
            return (
              <li key={`${member.name}-${index}`}>Name: {member.name}
                <ul>
                  { member?.weapon ? <li>Weapon: {member.weapon.name}</li> : null }
                </ul>
              </li>
            )
          })
        }
      </ul>
    </aside>
  )
}

export default FrameParty