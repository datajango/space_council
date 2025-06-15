import matplotlib.pyplot as plt

# Define the color palette
colors = [
    ('Astro Blue', '#1B2A49'),
    ('Orbital Teal', '#37B3A9'),
    ('Solar Gold', '#F2C94C'),
    ('Nebula White', '#F5F7FA'),
    ('Deep Space', '#0D0F19'),
    ('Stardust Gray', '#333A56'),
    ('Comet Light', '#7A8094'),
]

# Create the figure
fig, ax = plt.subplots(figsize=(6, 4))
for idx, (name, hexcode) in enumerate(colors):
    ax.barh(idx, 1, color=hexcode)
    ax.text(1.02, idx, f'{name} ({hexcode})', va='center', fontsize=10)

ax.set_xlim(0, 2)
ax.set_ylim(-0.5, len(colors) - 0.5)
ax.axis('off')
plt.tight_layout()
plt.show()
