<script>
  const kopo = [
    [
      [17, 18],
      [15, 16],
    ],
    [
      [23, 24],
      [9, 10],
    ],
    [
      [21, 22],
      [11, 12],
    ],
    [
      [19, 20],
      [13, 14],
    ],
    [
      [18, 17],
      [16, 15],
    ],
    [
      [24, 23],
      [10, 9],
    ],
    [
      [22, 21],
      [12, 11],
    ],
    [
      [20, 19],
      [14, 13],
    ],
  ];
  const ro16 = [
    [[], [1, 2]],
    [[], [7, 8]],
    [[], [5, 6]],
    [[], [3, 4]],
    [[], [2, 1]],
    [[], [8, 7]],
    [[], [6, 5]],
    [[], [4, 3]],
  ];
  let { teams, table } = $props();
</script>

<section class="mb-12 px-3 py-1.5 max-w-full overflow-x-auto">
  <div class="flex">
    <!-- KO Play-offs -->
    <div class="flex flex-col space-y-10">
      <div
        class="m-auto px-3 pt-0.5 bg-blue-600 rounded-xl text-sm whitespace-nowrap"
      >
        KO PLAY-OFFS
      </div>
      {#each Array(8) as _, i}
        {@const team1 = teams.get(table[kopo[i][0][0] - 1])}
        {@const team2 = teams.get(table[kopo[i][0][1] - 1])}
        {@const team3 = teams.get(table[kopo[i][1][0] - 1])}
        {@const team4 = teams.get(table[kopo[i][1][1] - 1])}
        <div class="flex items-center">
          <div class="w-64">
            <div
              class="flex justify-between h-6 bg-blue-900 rounded-tl-full rounded-tr-full bg-opacity-35"
            ></div>
            <div class="flex h-16 bg-blue-900 bg-opacity-35">
              <div
                class="flex flex-col items-center w-32 border-r border-blue-600 border-opacity-35"
              >
                <div class="flex h-8">
                  <div
                    class="flex items-center justify-center w-8 text-xl bg-blue-900 font-champions-bold"
                  >
                    {kopo[i][0][0]}
                  </div>
                  <div
                    class="flex items-center justify-center w-4 text-3xl text-blue-600 font-champions-light text-opacity-35"
                  >
                    /
                  </div>
                  <div
                    class="flex items-center justify-center w-8 text-xl bg-blue-900 font-champions-bold"
                  >
                    {kopo[i][0][1]}
                  </div>
                </div>
                <div class="flex h-8 space-x-4">
                  <div class="flex justify-center w-8 p-1">
                    <img
                      class="h-full"
                      src="team/{team1.id}.svg"
                      alt={team1.name}
                    />
                  </div>
                  <div class="flex justify-center w-8 p-1">
                    <img
                      class="h-full"
                      src="team/{team2.id}.svg"
                      alt={team2.name}
                    />
                  </div>
                </div>
              </div>
              <div
                class="flex flex-col items-center w-32 border-l border-blue-600 border-opacity-35"
              >
                <div class="flex h-8">
                  <div
                    class="flex items-center justify-center w-8 text-xl bg-blue-800 font-champions-bold"
                  >
                    {kopo[i][1][0]}
                  </div>
                  <div
                    class="flex items-center justify-center w-4 text-3xl text-blue-600 font-champions-light text-opacity-35"
                  >
                    /
                  </div>
                  <div
                    class="flex items-center justify-center w-8 text-xl bg-blue-800 font-champions-bold"
                  >
                    {kopo[i][1][1]}
                  </div>
                </div>
                <div class="flex h-8 space-x-4">
                  <div class="flex justify-center w-8 p-1">
                    <img
                      class="h-full"
                      src="team/{team3.id}.svg"
                      alt={team3.name}
                    />
                  </div>
                  <div class="flex justify-center w-8 p-1">
                    <img
                      class="h-full"
                      src="team/{team4.id}.svg"
                      alt={team4.name}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              class="h-6 bg-blue-900 rounded-bl-full rounded-br-full bg-opacity-35"
            ></div>
          </div>
          <div class="w-10 h-0.5 bg-blue-900"></div>
        </div>
      {/each}
    </div>
    <!-- Round of 16 -->
    <div class="flex flex-col space-y-10">
      <div
        class="m-auto px-3 pt-0.5 bg-blue-900 rounded-xl text-sm whitespace-nowrap"
      >
        ROUND OF 16
      </div>
      {#each Array(8) as _, i}
        {@const team3 = teams.get(table[ro16[i][1][0] - 1])}
        {@const team4 = teams.get(table[ro16[i][1][1] - 1])}
        <div class="flex items-center">
          <div class="w-10 h-0.5 bg-blue-900"></div>
          <div class="w-64">
            <div
              class="flex justify-between h-6 bg-blue-900 rounded-tl-full rounded-tr-full bg-opacity-35"
            ></div>
            <div class="flex h-16 bg-blue-900 bg-opacity-35">
              <div
                class="flex items-center w-32 text-center border-r border-blue-600 border-opacity-35"
              >
                KO PLAY-OFFS WINNER
              </div>
              <div
                class="flex flex-col items-center w-32 border-l border-blue-600 border-opacity-35"
              >
                <div class="flex h-8">
                  <div
                    class="flex items-center justify-center w-8 text-xl text-blue-900 font-champions-bold bg-cyan-400"
                  >
                    {ro16[i][1][0]}
                  </div>
                  <div
                    class="flex items-center justify-center w-4 text-3xl text-blue-600 font-champions-light text-opacity-35"
                  >
                    /
                  </div>
                  <div
                    class="flex items-center justify-center w-8 text-xl text-blue-900 font-champions-bold bg-cyan-400"
                  >
                    {ro16[i][1][1]}
                  </div>
                </div>
                <div class="flex h-8 space-x-4">
                  <div class="flex justify-center w-8 p-1">
                    <img
                      class="h-full"
                      src="team/{team3.id}.svg"
                      alt={team3.name}
                    />
                  </div>
                  <div class="flex justify-center w-8 p-1">
                    <img
                      class="h-full"
                      src="team/{team4.id}.svg"
                      alt={team4.name}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              class="h-6 bg-blue-900 rounded-bl-full rounded-br-full bg-opacity-35"
            ></div>
          </div>
          <div class="w-10 h-0.5 bg-blue-900"></div>
        </div>
      {/each}
    </div>
    <!-- Quarter-finals -->
    <div class="flex flex-col space-y-10">
      <div class="px-3 pt-0.5 bg-blue-600 rounded-xl text-sm whitespace-nowrap">
        QUARTER-FINALS
      </div>
      <div class="flex flex-col justify-between h-full py-14">
        {#each Array(4) as _}
          <div class="flex items-center">
            <div class="w-0.5 h-38 bg-blue-900"></div>
            <div class="w-10 h-0.5 bg-blue-900"></div>
            <div class="w-64">
              <div
                class="h-6 bg-blue-900 rounded-tl-full rounded-tr-full bg-opacity-35"
              ></div>
              <div class="h-16 text-center bg-blue-900 bg-opacity-35">
                <p>Match</p>
              </div>
              <div
                class="h-6 bg-blue-900 rounded-bl-full rounded-br-full bg-opacity-35"
              ></div>
            </div>
            <div class="w-10 h-0.5 bg-blue-900"></div>
          </div>
        {/each}
      </div>
    </div>
    <!-- Semi-finals -->
    <div class="flex flex-col space-y-10">
      <div class="px-3 pt-0.5 bg-blue-900 rounded-xl text-sm whitespace-nowrap">
        SEMI-FINALS
      </div>
      <div class="flex flex-col justify-between h-full py-33">
        {#each Array(2) as _}
          <div class="flex items-center">
            <div class="w-0.5 h-76 bg-blue-900"></div>
            <div class="w-10 h-0.5 bg-blue-900"></div>
            <div class="w-64">
              <div
                class="h-6 bg-blue-900 rounded-tl-full rounded-tr-full bg-opacity-35"
              ></div>
              <div class="h-16 text-center bg-blue-900 bg-opacity-35">
                <p>Match</p>
              </div>
              <div
                class="h-6 bg-blue-900 rounded-bl-full rounded-br-full bg-opacity-35"
              ></div>
            </div>
            <div class="w-10 h-0.5 bg-blue-900"></div>
          </div>
        {/each}
      </div>
    </div>
    <!-- Final -->
    <div class="flex flex-col space-y-10">
      <div class="px-3 pt-0.5 bg-blue-600 rounded-xl text-sm whitespace-nowrap">
        FINAL
      </div>
      <div class="flex justify-center h-full">
        <div class="flex items-center">
          <div class="w-0.5 h-152 bg-blue-900"></div>
          <div class="w-10 h-0.5 bg-blue-900"></div>
          <div class="w-64">
            <div
              class="h-6 bg-blue-900 rounded-tl-full rounded-tr-full bg-opacity-35"
            ></div>
            <div class="h-16 text-center bg-blue-900 bg-opacity-35">
              <p>Match</p>
            </div>
            <div
              class="h-6 bg-blue-900 rounded-bl-full rounded-br-full bg-opacity-35"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
